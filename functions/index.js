const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { Storage } = require("@google-cloud/storage");

// const creds = require("./serviceAccount.json");

admin.initializeApp({
  // credential: admin.credential.cert(creds),
});

// Initialize default data for new users
exports.usercreationhook = require("./createUserHook").createUserHook;

const db = admin.firestore();
const storage = new Storage();

exports.generateJsonFile = functions.https.onCall(async (data, context) => {
  const { docId, lang } = data;
  const uid = context.auth.uid;
  const docRef = db.collection(`user/${uid}/translations`).doc(docId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new functions.https.HttpsError("not-found", "Document not found");
  }

  const jsonData = doc.data()[lang];
  const jsonString = JSON.stringify(jsonData);
  const bucket = storage.bucket("translations");
  const file = bucket.file(`${docId}_${lang}.json`);

  await file.save(jsonString, {
    contentType: "application/json",
  });

  const signedUrlConfig = {
    action: "read",
    // Now in 2 years in YYYY-MM-DD format
    expires: Date.now() + 1000 * 60 * 60 * 24 * 365 * 2,
  };

  const [url] = file.getSignedUrl(signedUrlConfig);

  return { url };
});

const bucketName = "translations";

const handleDocumentSave = async (change, context) => {
  const { docId } = context.params;
  const userId = context.params.userId;
  const sanitizedDocId = docId
      .replace(".json", "")
      .replace(/[^a-zA-Z0-9]/g, "-");

  // If the document is deleted, we do nothing
  if (!change.after.exists) {
    console.log(`Document ${docId} was deleted`);
    return null;
  }

  const newData = change.after.data();

  // Iterate over each language and save the content to a storage file
  const promises = Object.keys(newData).map(async (lang) => {
    const content = newData[lang];
    const fileName = `${sanitizedDocId}_${lang}.json`;
    const file = storage.bucket(`${bucketName}-${userId}`).file(fileName);

    const jsonContent = JSON.stringify(content);

    await file.save(jsonContent, {
      contentType: "application/json",
    });

    // Make the file public
    await file.makePublic();

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

    // Update Firestore with the public URL
    await admin
      .firestore()
        .collection("user")
        .doc(userId)
        .collection("urls")
        .doc(docId)
      .set(
        { [`${lang}`]: publicUrl },
        {
          merge: true,
        },
      );

    console.log(
      `File ${fileName} created successfully in bucket ${bucketName}`,
    );
  });

  await Promise.all(promises);

  return null;
};

exports.generateJsonFileOnDocumentSave = functions.firestore
  .document("user/{userId}/translations/{docId}")
  .onCreate(handleDocumentSave);

exports.updateJsonFileOnDocumentSave = functions.firestore
  .document("user/{userId}/translations/{docId}")
  .onUpdate(handleDocumentSave);

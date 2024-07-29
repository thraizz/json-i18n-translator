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
  console.log("data", data);
  const { docId, lang } = data;
  const uid = context.auth.uid;
  const docRef = db.collection(`user/${uid}/translations`).doc(docId);
  console.log(docRef.path);
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

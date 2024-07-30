const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

const createDefaults = async (user) => {
  // Create a translation bucket for this user
  const bucketName = `translations-${user.uid}`;
  const bucket = storage.bucket(bucketName);
  await bucket.create();

  // Create languages
  const defaultLanguages = [
    {
      id: "en",
      name: "English",
    },
    {
      id: "es",
      name: "Spanish",
    },
    {
      id: "fr",
      name: "French",
    },
    {
      id: "de",
      name: "German",
    },
  ];

  // Build all promises
  const promises = defaultLanguages.map((language) =>
    getFirestore()
      .collection("user")
      .doc(user.uid)
      .collection("languages")
      .add(language),
  );
  // Execute all promises
  await Promise.all(promises);
};

const createUserHook = functions.auth.user().onCreate(async (user) => {
  await createDefaults(user);
});

exports.createUserHook = createUserHook;

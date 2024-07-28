const functions = require("firebase-functions");

const { getFirestore } = require("firebase-admin/firestore");
const createDefaults = async (user) => {
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

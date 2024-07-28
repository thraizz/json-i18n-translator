import { getAnalytics } from "firebase/analytics";
import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";


// Using VITE_ prefix to access environment variables
const firebaseOptions: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


export const app = initializeApp(firebaseOptions);

export const auth = getAuth(app);
// Set persistence
setPersistence(auth, browserLocalPersistence);

export const provider = new GoogleAuthProvider();

// Expose Cloud Firestore reference
export const db = getFirestore(app);

// Export firebase functions
export const functions = getFunctions(app);

// Export analytics
export const analytics = !import.meta.env.DEV && getAnalytics(app);

// If on localhost, connect to the emulator
if (import.meta.env.REACT_APP_MOCK || import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
}

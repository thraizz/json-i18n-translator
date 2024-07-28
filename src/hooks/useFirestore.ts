import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../scripts/firebase";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import { getJsonWithEmptyValues } from "../utils/getJsonWithEmptyValues";

export type Doc = { id: string; data: any };

export const getJsonFile = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    return null;
  }
};

export const useJSONCollectionName = () => {
  const { user } = useAuth();
  return user ? `user/${user.uid}/translations` : null;
};

export const fetchAllDocuments = async (collectionName: string) => {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  const documents: Doc[] = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, data: doc.data() });
  });
  return documents;
};

export const fetchJsonFile = async (
  collectionName: string,
  docId: string,
  lang: string,
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data()[lang] || getJsonWithEmptyValues(docSnap.data());
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    return null;
  }
};

export const updateJsonFile = async (
  collectionName: string,
  docId: string,
  jsonObject: any,
  lang: string,
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, { [lang]: jsonObject });
    console.log("Document updated with ID: ", docRef.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const uploadJsonFile = async (
  collectionName: string,
  docId: string,
  jsonObject: any,
  lang: string,
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    // First, try to get the document to see if it exists
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // If it exists, update the document
      await updateDoc(docRef, { [lang]: jsonObject });
      console.log("Document updated with ID: ", docRef.id);
      return;
    } else {
      await setDoc(docRef, { [lang]: jsonObject });
    }
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error writing document: ", e);
  }
};

type Language = { _uid: string; id: string; name: string };
export type LanguageWithId = { id: string; name: string };

export const useLanguages = () => {
  const { user } = useAuth();

  const [languages, setLanguages] = useState<Language[]>([]);

  const getLanguages = async () => {
    if (!user) return;
    const languagesRef = collection(db, `user/${user.uid}/languages`);
    const querySnapshot = await getDocs(languagesRef);
    const languages: Language[] = [];
    querySnapshot.forEach((doc) => {
      languages.push({
        _uid: doc.id,
        id: doc.data().id,
        name: doc.data().name,
      });
    });
    setLanguages(languages);
  };

  const addLanguage = async (id: string, name: string) => {
    if (!user) return;
    const languagesRef = collection(db, `user/${user.uid}/languages`);
    const newLangDoc = doc(languagesRef, id);
    await setDoc(newLangDoc, { id, name });
    getLanguages();
  };

  useEffect(() => {
    getLanguages();
  }, [user]);

  return { languages, addLanguage, refresh: getLanguages };
};

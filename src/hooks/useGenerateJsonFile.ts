import { httpsCallable, HttpsCallableResult } from "firebase/functions";
import { functions } from "../scripts/firebase";

export const generateJsonFile = async (docId: string, lang: string) => {
  const generateJsonFileFunc = httpsCallable(functions, "generateJsonFile");
  try {
    const result = (await generateJsonFileFunc({
      docId,
      lang,
    })) as HttpsCallableResult<{ url: string }>;
    return result.data.url;
  } catch (error) {
    console.error("Error generating JSON file: ", error);
    throw error;
  }
};

import { useAtom } from "jotai";
import { languageAtom } from "../atoms";

export const useJSONFileLanguage = () => useAtom(languageAtom);

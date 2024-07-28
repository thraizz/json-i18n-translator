import { User } from "firebase/auth";
import { atom } from "jotai";

export const userAtom = atom<null | User>(null);
export const loadingAtom = atom(true);
export const errorAtom = atom(null);

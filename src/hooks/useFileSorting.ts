import sortObject from "deep-sort-object";
import { atom, useAtom } from "jotai";
import { Field } from "../components/FileEdit";

export const SORTING_OPTIONS = {
  ALPHABETICAL: "ALPHABETICAL",
  BY_EMPTY: "BY_EMPTY",
};

const sortByEmpty = (a: any, b: any) => {
  if (a === "" && b !== "") return -1;
  if (a !== "" && b === "") return 1;
  return 0;
};

export const sortKeysBy: (
  data: any,
  sorting: keyof typeof SORTING_OPTIONS,
) => Field[] = (data, sorting) => {
  if (sorting === SORTING_OPTIONS.ALPHABETICAL) {
    return Object.keys(sortObject(data)).map((label) => ({
      label,
      value: data[label],
    }));
  } else if (sorting === SORTING_OPTIONS.BY_EMPTY) {
    const a = Object.fromEntries(
      Object.entries(data).sort((a, b) => sortByEmpty(a[1], b[1])),
    );
    return Object.keys(a).map((label) => ({ label, value: a[label] }));
  }
  return [];
};

export const sortingAtom = atom<keyof typeof SORTING_OPTIONS>("ALPHABETICAL");
export const useFileSorting = () => {
  const [sorting, setSorting] =
    useAtom<keyof typeof SORTING_OPTIONS>(sortingAtom);

  return { sorting, setSorting };
};

import sortObject from "deep-sort-object";
import { atom, useAtom } from "jotai";

export const SORTING_OPTIONS = {
  ALPHABETICAL: "ALPHABETICAL",
  BY_EMPTY: "BY_EMPTY",
};

const sortByEmpty = (a: any, b: any) => {
  if (a === "" && b !== "") return -1;
  if (a !== "" && b === "") return 1;
  return 0;
};

export const sortKeysBy = (
  data: any,
  sorting: keyof typeof SORTING_OPTIONS,
) => {
  if (sorting === SORTING_OPTIONS.ALPHABETICAL) {
    return sortObject(data);
  } else if (sorting === SORTING_OPTIONS.BY_EMPTY) {
    return Object.fromEntries(
      Object.entries(data).sort((a, b) => sortByEmpty(a[1], b[1])),
    );
  }
};

export const sortingAtom = atom<keyof typeof SORTING_OPTIONS>("ALPHABETICAL");
export const useFileSorting = () => {
  const [sorting, setSorting] =
    useAtom<keyof typeof SORTING_OPTIONS>(sortingAtom);

  return { sorting, setSorting };
};

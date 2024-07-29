import { useFileSorting, SORTING_OPTIONS } from "../hooks/useFileSorting";

export const SortKeysBySelector = () => {
  const { sorting, setSorting } = useFileSorting();

  return (
    <label className="flex flex-row gap-2 items-center">
      Sorty by
      <select
        className="border border-gray-300 rounded p-1"
        value={sorting}
        onChange={(e) =>
          setSorting(e.target.value as keyof typeof SORTING_OPTIONS)
        }
      >
        <option value={SORTING_OPTIONS.ALPHABETICAL}>Alphabetical</option>
        <option value={SORTING_OPTIONS.BY_EMPTY}>By empty</option>
      </select>
    </label>
  );
};

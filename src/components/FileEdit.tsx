import { useState, useEffect, useMemo, Fragment } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  fetchJsonFile,
  updateJsonFile,
  useJSONCollectionName,
  useLanguages,
} from "../hooks/useFirestore";
import { flattenJson } from "../utils/flattenJson";
import { unflattenJson } from "../utils/unflattenJson";
import { LanguageSelector } from "./LanguageSelector";
import { useJSONFileLanguage } from "../hooks/useJSONFileLanguage";
import { generateJsonFile } from "../hooks/useGenerateJsonFile";
import { SortKeysBySelector } from "./SortKeysBySelector";
import { sortKeysBy, useFileSorting } from "../hooks/useFileSorting";

export type Field = {
  label: string;
  value: string;
};

type EditForm = {
  keys: Array<Field>;
};
type Status = { type: "success" | "error"; message: string };

export const FileEdit = ({ docId }: { docId: string }) => {
  const { sorting } = useFileSorting();
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [jsonData, setJsonData] = useState<any | null>(null);
  const [lang] = useJSONFileLanguage();
  const { languages } = useLanguages();
  const collectionName = useJSONCollectionName();

  const { control, handleSubmit } = useForm<EditForm>({
    defaultValues: {
      keys: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "keys",
  });

  const selectedLanguage = useMemo(
    () => languages.find((l) => l.id === lang),
    [languages, lang],
  );

  const flattenedJson: Field[] = useMemo(() => {
    return sortKeysBy(flattenJson(jsonData), sorting);
  }, [jsonData, sorting]);

  useEffect(() => {
    replace(flattenedJson);
  }, [flattenedJson, replace]);

  useEffect(() => {
    const fetchJson = async () => {
      if (!collectionName) return;
      const jsonData = await fetchJsonFile(collectionName, docId, lang);
      if (jsonData) {
        if (jsonData.lang) delete jsonData.lang;
        setJsonData(jsonData);
      } else {
        setJsonData(null);
      }
    };
    fetchJson();
  }, [docId, lang, collectionName]);

  const onSubmit = async (data: EditForm) => {
    if (!collectionName) return;
    try {
      const unflattenedData = unflattenJson(data);
      await updateJsonFile(collectionName, docId, unflattenedData, lang);
      setStatus({ type: "success", message: "JSON uploaded successfully!" });
    } catch (e) {
      setStatus({ type: "error", message: "Failed to upload JSON" });
    }
  };

  const handleGenerateJsonFile = async () => {
    try {
      const url = await generateJsonFile(docId, lang);
      setFileUrl(url);
    } catch (e) {
      console.error("Failed to generate JSON file:", e);
    }
  };

  if (flattenedJson === undefined) return <p>Loading JSON...</p>;
  else if (flattenedJson === null) return <p>Error fetching JSON</p>;

  return (
    <>
      <LanguageSelector />
      <SortKeysBySelector />
      <div>
        <h2 className="font-bold">
          {docId}
          <span className="ml-4 text-sm text-gray-500">
            ({selectedLanguage?.name})
          </span>
        </h2>
        <hr className="my-4" />
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div
            className="grid max-h-[70vh] gap-y-2 items-center overflow-y-scroll border-2 border-gray-300 rounded p-4"
            style={{
              gridTemplateColumns: "minmax(auto, 30%) minmax(0, auto)",
            }}
          >
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <label
                  htmlFor={field.id}
                  className="text-left pr-4 font-medium w-fit max-w-full whitespace-normal break-words"
                >
                  {field.label}
                </label>
                <Controller
                  name={`keys.${index}.value` as const}
                  control={control}
                  render={({ field: f }) => (
                    <input
                      {...f}
                      id={field.id}
                      className="px-3 py-2 border border-gray-300 rounded w-full"
                    />
                  )}
                />
              </Fragment>
            ))}
          </div>
          {status && (
            <div
              className={`p-2 text-white ${
                status.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {status.message}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleGenerateJsonFile}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Generate JSON File
            </button>
            {fileUrl && (
              <div className="mt-2">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Download JSON File
                </a>
              </div>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

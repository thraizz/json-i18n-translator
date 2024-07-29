import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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

export const FileEdit = ({ docId }: { docId: string }) => {
  type EditForm = {
    [key: string]: string;
  };
  type Status = { type: "success" | "error"; message: string };
  const [status, setStatus] = useState<undefined | Status>(undefined);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<EditForm>();

  const [lang] = useJSONFileLanguage();
  const { languages } = useLanguages();

  const selectedLanguage = languages.find((l) => l.id === lang);
  const [flattenedJson, setFlattenedJson] = useState<object | undefined | null>(
    undefined,
  );
  const collectionName = useJSONCollectionName();

  useEffect(() => {
    const fetchJson = async () => {
      if (!collectionName) return;
      const jsonData = await fetchJsonFile(collectionName, docId, lang);
      if (jsonData) {
        if (jsonData.lang) delete jsonData.lang;
        const flattened = flattenJson(jsonData);
        setFlattenedJson(flattened);
        reset(flattened);
      } else {
        setFlattenedJson(null);
      }
    };
    fetchJson();
  }, [docId, reset, lang, collectionName]);

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
            {Object.keys(flattenedJson).map((key) => (
              <>
                <label
                  htmlFor={key}
                  className="text-left pr-4 font-medium w-fit max-w-full whitespace-normal break-words"
                >
                  {key}
                </label>
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id={key}
                      className="px-3 py-2 border border-gray-300 rounded w-full"
                    />
                  )}
                />
              </>
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

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

export const FileEdit = ({ docId }: { docId: string }) => {
  type EditForm = {
    [key: string]: string;
  };
  type Status = { type: "success" | "error"; message: string };
  const [status, setStatus] = useState<undefined | Status>(undefined);
  const { control, handleSubmit, reset } = useForm<EditForm>();

  const lang = useJSONFileLanguage();
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
        console.log(flattened);
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

  if (flattenedJson === undefined) return <p>Loading JSON...</p>;
  else if (flattenedJson === null) return <p>Error fetching JSON</p>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <LanguageSelector />
      </div>
      <h2 className="font-bold">
        {docId}
        <span className="ml-4 text-sm text-gray-500">
          ({selectedLanguage?.name})
        </span>
      </h2>
      <hr className="my-4" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {Object.keys(flattenedJson).map((key) => (
          <div key={key} className="flex items-center">
            <label className="w-1/3 text-right pr-4 font-medium">{key}</label>
            <Controller
              name={key}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-2/3 px-3 py-2 border border-gray-300 rounded"
                />
              )}
            />
          </div>
        ))}
        {status && (
          <div
            className={`p-2 text-white ${
              status.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {status.message}
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

import { useState } from "react";
import { uploadJsonFile, useJSONCollectionName } from "../hooks/useFirestore";
import { LanguageSelector } from "./LanguageSelector";
import { useForm } from "react-hook-form";
import { FormStatus, Status } from "./FormStatus";
import { useJSONFileLanguage } from "../hooks/useJSONFileLanguage";

type FileUploadForm = {
  docId: string;
  json: string;
  lang: string;
};

export const FileUpload = () => {
  const { register, handleSubmit } = useForm<FileUploadForm>();
  const lang = useJSONFileLanguage();
  const [status, setStatus] = useState<undefined | Status>(undefined);
  const collectionName = useJSONCollectionName();

  const onSubmit = async (data: FileUploadForm) => {
    if (!collectionName) return;
    try {
      const jsonObject = JSON.parse(data.json);
      await uploadJsonFile(collectionName, data.docId, jsonObject, lang);
      setStatus({ type: "success", message: "JSON uploaded successfully!" });
    } catch (e) {
      setStatus({ type: "error", message: "Failed to upload JSON" });
    }
  };

  return (
    <form
      className="max-w-2xl flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Upload JSON</h2>
      <LanguageSelector />
      <label className="flex flex-col">
        Translation Name
        <input
          type="text"
          placeholder="translation.json"
          className="p-2"
          {...register("docId", { required: true })}
        />
      </label>
      <label className="flex flex-col">
        JSON Content
        <textarea
          {...register("json", { required: true })}
          className="h-40 p-2"
          placeholder="Paste JSON here"
        />
      </label>
      <FormStatus status={status} />
      <button type="submit">Upload JSON</button>
    </form>
  );
};

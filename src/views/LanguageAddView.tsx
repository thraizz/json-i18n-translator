import { useForm } from "react-hook-form";
import { LanguageWithId, useLanguages } from "../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";

export const LanguageAddView = () => {
  const { register, handleSubmit } = useForm<LanguageWithId>();

  const { addLanguage } = useLanguages();

  const navigate = useNavigate();
  const onSubmit = (data: LanguageWithId) => {
    addLanguage(data.id, data.name).then(() => {
      navigate(routes.LanguageManage);
    });
  };
  return (
    <form
      className="max-w-2xl flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Add Language</h2>
      <label className="flex flex-col">
        Language Name
        <input
          type="text"
          placeholder="English"
          className="p-2"
          {...register("name", { required: true })}
        />
      </label>
      <label className="flex flex-col">
        Language Code
        <input
          type="text"
          placeholder="en"
          className="p-2"
          {...register("id", { required: true })}
        />
      </label>
      <button type="submit">Add Language</button>
    </form>
  );
};

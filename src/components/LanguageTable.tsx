import { Link } from "react-router-dom";
import { useLanguages } from "../hooks/useFirestore";
import { routes } from "../router/routes";

export const LanguageTable = () => {
  const { languages } = useLanguages();

  return (
    <div className="mb-2 flex flex-col gap-2">
      {languages.map((lang) => (
        <div
          key={lang.id}
          className="border-2 border-black dark:border-white flex flex-row gap-2 w-fit min-w-52 p-4 items-center"
        >
          <p className="font-semibold">{lang.name}</p>
          <p>({lang.id})</p>
          <button
            className="ml-auto bg-red-500 text-white p-2 rounded hover:bg-red-600"
            onClick={() => alert("Deleting is not possible at the moment.")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 5.293a1 1 0 00-1.414 0L10 8.586 6.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
      <Link className="w-fit" to={routes.LanguageAdd}>
        Add Language
      </Link>
    </div>
  );
};

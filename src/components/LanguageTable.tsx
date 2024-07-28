import { Link } from "react-router-dom";
import { useLanguages } from "../hooks/useFirestore";
import { routes } from "../router/routes";

export const LanguageTable = () => {
  const { languages } = useLanguages();

  return (
    <div className="">
      <div className="mb-2">
        {languages.map((lang) => (
          <div key={lang.id} className="flex flex-row gap-2">
            <p className="font-semibold">{lang.name}</p>
            <p>({lang.id})</p>
          </div>
        ))}
      </div>
      <Link to={routes.LanguageAdd}>Add Language</Link>
    </div>
  );
};

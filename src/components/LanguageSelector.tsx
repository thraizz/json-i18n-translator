import { Link, useSearchParams } from "react-router-dom";
import { useLanguages } from "../hooks/useFirestore";
import { routes } from "../router/routes";
import { getLangFromSearchParams } from "../hooks/useJSONFileLanguage";

export const LanguageSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = getLangFromSearchParams(searchParams);
  const { languages } = useLanguages();
  return (
    <div className="flex border-2 border-blue-400 w-fit px-2 flex-row items-center gap-2">
      <div>
        <label className="mr-2">Select Language:</label>
        <select
          value={lang}
          onChange={(e) => {
            setSearchParams({ lang: e.target.value });
          }}
          className="border rounded px-2 py-1"
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <Link className="border-none" to={routes.LanguageManage}>
        Manage Languages
      </Link>
    </div>
  );
};

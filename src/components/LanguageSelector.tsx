import { useLanguages } from "../hooks/useFirestore";
import { useAtom } from "jotai";
import { languageAtom } from "../atoms";

export const LanguageSelector = () => {
  const [lang, setLang] = useAtom(languageAtom);
  const { languages } = useLanguages();
  return (
    <div className="flex border-2 border-blue-500 w-fit p-2 flex-row items-center gap-2">
      <label>Select Language:</label>
      <select
        value={lang}
        onChange={(e) => {
          setLang(e.target.value);
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
  );
};

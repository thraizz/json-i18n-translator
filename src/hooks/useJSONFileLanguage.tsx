import { useSearchParams } from "react-router-dom";

export const getLangFromSearchParams = (searchParams: URLSearchParams) =>
  searchParams.get("lang") || "en";

export const useJSONFileLanguage = () => {
  const [searchParams] = useSearchParams();
  return getLangFromSearchParams(searchParams);
};

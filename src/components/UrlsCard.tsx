import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../scripts/firebase";

export const UrlsCard = ({ docId }: { docId: string }) => {
  const { urls, loading, error } = useTranslationUrls(docId);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <ul className="list-disc list-inside">
          {urls.map((url) => (
            <li className="flex flex-row gap-2" key={url.url}>
              <a href={url.url}>
                {docId} - {url.lang}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface TranslationUrl {
  lang: string;
  url: string;
}

const useTranslationUrls = (docId: string) => {
  const [urls, setUrls] = useState<TranslationUrl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const userId = auth.currentUser?.uid;
        const d = await getDoc(doc(db, `user/${userId}/urls/${docId}`));

        const data = d.data() || {};
        const urlsData: TranslationUrl[] = Object.entries(data).map(
          ([lang, url]) => ({
            lang,
            url,
          }),
        );
        setUrls(urlsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [docId]);

  return { urls, loading, error };
};

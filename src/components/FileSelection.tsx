import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Doc,
  fetchAllDocuments,
  useJSONCollectionName,
} from "../hooks/useFirestore";
import { routes } from "../router/routes";

export const FileSelection = () => {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionName = useJSONCollectionName();

  useEffect(() => {
    const loadDocuments = async () => {
      if (!collectionName) return;
      try {
        const docs = await fetchAllDocuments(collectionName);
        setDocuments(docs);
      } catch (err: any) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [collectionName]);

  if (loading) {
    return <div>Loading documents...</div>;
  }

  if (error) {
    return <div>Error fetching documents: {error}</div>;
  }

  if (documents.length === 0) {
    return <div>No documents found</div>;
  }

  return (
    <div>
      <h2>Uploaded Documents</h2>
      <div className="flex flex-col gap-2 max-w-96">
        {documents.map((doc) => (
          <Link to={routes.FileEdit(doc.id)} key={doc.id}>
            <strong>Name:</strong> {doc.id} <br />
          </Link>
        ))}
      </div>
    </div>
  );
};

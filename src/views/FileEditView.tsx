import { Navigate, useParams } from "react-router-dom";
import { routes } from "../router/routes";
import { FileEdit } from "../components/FileEdit";

export const FileEditView = () => {
  const docId = useParams<{ docId: string }>().docId;
  if (docId === undefined) return <Navigate to={routes.Dashboard} />;

  return <FileEdit docId={docId} />;
};

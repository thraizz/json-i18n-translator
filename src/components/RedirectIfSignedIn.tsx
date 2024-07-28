import { PropsWithChildren } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { routes } from "../router/routes";
import { useAuth } from "../hooks/useAuth";

export const RedirectIfSignedIn = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();

  const [searchParams] = useSearchParams();

  // // Check if we are in jira callback, dont redirect there
  // const isJiraCallback =
  //   useMatch(routes.JiraCallback) &&
  //   searchParams.get("code") &&
  //   searchParams.get("state");

  return user?.uid ? (
    <Navigate to={searchParams.get("redirect") || routes.Dashboard} replace />
  ) : (
    <div>{children}</div>
  );
};

import { PropsWithChildren } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { routes } from "../router/routes";
import { useAuth } from "../hooks/useAuth";

export const GuardedLayout = ({ children }: PropsWithChildren) => {
  const { user, logout } = useAuth();

  if (!user?.uid) {
    const params = new URLSearchParams();
    if (window.location.pathname !== routes.Login) {
      params.set("redirect", window.location.pathname);
      const redirectTarget = `${routes.Login}?${params.toString()}`;
      return <Navigate to={redirectTarget} replace />;
    }
  }

  return (
    <div>
      <div className="flex border-b-white border-b-2 flex-row justify-between">
        <nav className="flex flex-row gap-2">
          <NavLink end to={routes.Dashboard}>
            List files
          </NavLink>
          <NavLink end to={routes.FileUpload}>
            Upload file
          </NavLink>
          <NavLink to={routes.LanguageManage}>Manage Languages</NavLink>
        </nav>
        <button onClick={logout}>Logout</button>
      </div>
      <header>Hello, {user?.uid}</header>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <main className="flex h-fit flex-1 flex-col pt-20">{children}</main>
        </div>
      </div>
    </div>
  );
};

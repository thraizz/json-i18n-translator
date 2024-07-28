import {
  RouteObject,
  Outlet,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import { routes } from "./routes";
import { RedirectIfSignedIn } from "../components/RedirectIfSignedIn";

import { Providers } from "../providers/Providers";

import { LandingLayout } from "../layout/LandingLayout";
import { GuardedLayout } from "../layout/GuardedLayout";

import { Login } from "../views/Login";
import { Dashboard } from "../views/Dashboard";
import { FileSelectionView } from "../views/FileSelectionView";
import { FileUploadView } from "../views/FileUploadView";
import { LanguageManageView } from "../views/LanguageManageView";
import { FileEditView } from "../views/FileEditView";
import { LanguageAddView } from "../views/LanguageAddView";
import { SignUpView } from "../views/SignUpView";

const publicRoutes: RouteObject = {
  path: "/",
  element: (
    <Providers>
      <RedirectIfSignedIn>
        <LandingLayout>
          <Outlet />
        </LandingLayout>
      </RedirectIfSignedIn>
    </Providers>
  ),
  errorElement: <Navigate to="/" replace />,
  children: [
    {
      index: true,
      element: <Navigate to={routes.Login} replace />,
    },
    {
      path: routes.Login,
      element: <Login />,
    },
    {
      path: routes.SignUp,
      element: <SignUpView />,
    },
  ],
};

const portalRoutes: RouteObject = {
  path: "/app",
  element: (
    <Providers>
      <GuardedLayout>
        <Outlet />
      </GuardedLayout>
    </Providers>
  ),
  errorElement: <p>Not found</p>,
  children: [
    {
      index: true,
      element: <Navigate to={routes.Dashboard} replace />,
    },
    {
      path: routes.Dashboard,
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <FileSelectionView />,
        },
        {
          path: routes.FileUpload,
          element: <FileUploadView />,
        },
        {
          path: routes.FileEdit(":docId"),
          element: <FileEditView />,
        },
        {
          path: routes.LanguageManage,
          element: <LanguageManageView />,
        },
        {
          path: routes.LanguageAdd,
          element: <LanguageAddView />,
        },
      ],
    },
  ],
};

export const router = createBrowserRouter([publicRoutes, portalRoutes]);

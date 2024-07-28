const BASE_ROUTE = "/app";

export const BASE_DASHBOARD_ROUTE = BASE_ROUTE + "/dashboard";
const dashboardRoutes = {
  Dashboard: BASE_DASHBOARD_ROUTE,
  FileEdit: (docId: any) => BASE_DASHBOARD_ROUTE + `/edit/${docId}`,
  FileUpload: BASE_DASHBOARD_ROUTE + "/upload",
  LanguageManage: BASE_DASHBOARD_ROUTE + "/languages",
  LanguageAdd: BASE_DASHBOARD_ROUTE + "/languages/add",
} as const;

export const routes = {
  Login: "/login",
  Create: "/create",
  Reset: "/reset",
  GithubCallback: "/callback/gh",
  GitlabCallback: "/callback/gl",
  ...dashboardRoutes,
} as const;

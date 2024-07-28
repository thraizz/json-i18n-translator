import { createContext, PropsWithChildren } from "react";
import { AuthType, useAuth } from "../hooks/useAuth";

export const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
} as AuthType);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

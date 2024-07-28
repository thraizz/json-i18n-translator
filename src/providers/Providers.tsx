import { PropsWithChildren } from "react";
import { AuthProvider } from "../contexts/AuthProvider";

export const Providers = ({ children }: PropsWithChildren) => (
  <>
    <AuthProvider>{children}</AuthProvider>
  </>
);

import { PropsWithChildren } from "react";
import { AuthProvider } from "../contexts/AuthProvider";
import { createStore, Provider } from "jotai";

const myStore = createStore();

export const Providers = ({ children }: PropsWithChildren) => (
  <Provider store={myStore}>
    <AuthProvider>{children}</AuthProvider>
  </Provider>
);

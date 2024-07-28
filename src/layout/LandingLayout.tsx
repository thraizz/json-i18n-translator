import { PropsWithChildren } from "react";

export const LandingLayout = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col">
    <header>
      <h1>Landing</h1>
    </header>
    <main className="flex flex-grow">{children}</main>
  </div>
);

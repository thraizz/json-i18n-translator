import { FC } from "react";
import { GoogleSSO } from "./GoogleSSO";

export const AuthGoogleSSO: FC = () => (
  <div className="mt-6">
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-zinc-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-2 text-neutral-800 dark:bg-stone-900 dark:text-white">
          Or
        </span>
      </div>
    </div>

    <div className="mt-6 flex justify-center">
      <GoogleSSO />
    </div>
  </div>
);

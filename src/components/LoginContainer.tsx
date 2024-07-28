import { Link } from "react-router-dom";
import { routes } from "../router/routes";
import { AppearTransition } from "./AppearTransition";
import { AuthGoogleSSO } from "./AuthGoogleSSO";
import { LoginEmailForm } from "./LoginEmailForm";

export const LoginContainer = () => (
  <AppearTransition>
    <LoginEmailForm />
    <Link to={routes.SignUp} className="mt-4 block w-full text-center">
      Create account
    </Link>
    <AuthGoogleSSO />
  </AppearTransition>
);

import { Link } from "react-router-dom";
import { AuthGoogleSSO } from "../components/AuthGoogleSSO";
import { routes } from "../router/routes";
import { CreateEmailUserForm } from "../components/EmailSignupForm";
export const SignUpView = () => (
  <div className="my-auto flex h-full w-full flex-col justify-center px-4 pb-20 lg:px-8">
    <div className="card mx-auto min-w-full bg-white dark:bg-stone-900 px-10 py-8 text-black sm:min-w-[410px]">
      <CreateEmailUserForm />
      <Link
        to={routes.Login}
        className="primary-button-inverted mt-4 block w-full text-center"
      >
        Go back to login
      </Link>
      <AuthGoogleSSO />
    </div>
  </div>
);

import { LoginContainer } from "../components/LoginContainer";

export const Login = () => (
  <div className="my-auto flex h-full w-full flex-col justify-center px-4 pb-20 lg:px-8">
    <div className="card mx-auto min-w-full bg-white dark:bg-stone-900 px-10 py-8 text-black sm:min-w-[410px]">
      <LoginContainer />
    </div>
  </div>
);

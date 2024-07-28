import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { InputField } from "./InputField";

import { auth } from "../scripts/firebase";
import { routes } from "../router/routes";

type LoginFormData = {
  email: string;
  password: string;
  persist: boolean;
};
export function LoginEmailForm() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      persist: false,
    },
  });
  const handleLoginSubmit = (data: LoginFormData) => {
    const persistence = data.persist
      ? browserLocalPersistence
      : browserSessionPersistence;
    setPersistence(auth, persistence).then(() => {
      // login
      signInWithEmailAndPassword(auth, data.email, data.password).catch((e) => {
        if (e.code === "auth/user-not-found") {
          setError("email", {
            type: "validate",
            message: "No user found with this email address.",
          });
        } else if (e.code === "auth/wrong-password") {
          setError("password", {
            type: "validate",
            message: "Incorrect password.",
          });
        }
      });
    });
  };
  return (
    <form
      onSubmit={handleSubmit((data) => handleLoginSubmit(data))}
      className="space-y-4"
    >
      <InputField
        label="Email"
        register={register}
        name="email"
        errors={errors}
        options={{
          required: { value: true, message: "Please enter your email." },
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Please enter a valid email.",
          },
        }}
        type="email"
        placeholder="Your email"
      />

      <div>
        <InputField
          label="Password"
          register={register}
          name="password"
          errors={errors}
          options={{
            required: { value: true, message: "Please enter your password." },
          }}
          type="password"
          placeholder="Your password"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label
            htmlFor="remember-me"
            className="flex items-center text-sm text-zinc-900"
          >
            <input
              {...register("persist")}
              type="checkbox"
              id="remember-me"
              className="mr-2 h-4 w-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500"
            />
            <span className="text-center text-neutral-900 dark:text-white">
              Remember me
            </span>
          </label>
        </div>

        <Link
          to={routes.Reset}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-500"
        >
          Forgot your password?
        </Link>
      </div>

      <button type="submit" className="primary-button !mt-8 w-full text-center">
        Sign in
      </button>
    </form>
  );
}

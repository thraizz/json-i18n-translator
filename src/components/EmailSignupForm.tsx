import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { auth } from "../scripts/firebase";
import { useNavigate } from "react-router-dom";
import { routes } from "../router/routes";

type EmailAccountCreationForm = {
  email: string;
  password: string;
  passwordConfirmation: string;
  persist: boolean;
};
export const CreateEmailUserForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailAccountCreationForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const password = watch("password");
  const navigate = useNavigate();
  const handleCreateSubmit = (data: EmailAccountCreationForm) => {
    const persistence = data.persist
      ? browserLocalPersistence
      : browserSessionPersistence;
    setPersistence(auth, persistence).then(() => {
      // login
      createUserWithEmailAndPassword(auth, data.email, data.password).then(() =>
        navigate(routes.Dashboard),
      );
    });
  };
  return (
    <form onSubmit={handleSubmit(handleCreateSubmit)} className="space-y-4">
      <div>
        <InputField
          label="Email"
          register={register}
          name="email"
          autoComplete="username"
          errors={errors}
          options={{
            required: { value: true, message: "Email is required." },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email format is invalid.",
            },
          }}
          type="email"
          placeholder="Your email"
        />
      </div>

      <InputField
        label="New Password"
        register={register}
        name="password"
        errors={errors}
        options={{
          required: {
            value: true,
            message: "Password is required",
          },
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, and one number",
          },
        }}
        type="password"
        placeholder="Your new password"
        autoComplete="new-password"
      />
      <InputField
        label="Password"
        register={register}
        name="passwordConfirmation"
        errors={errors}
        type="password"
        placeholder="Your new password, again"
        autoComplete="new-password"
        options={{
          required: {
            value: true,
            message: "Password confirmation is required",
          },
          validate: {
            value: (value) => value === password || "Passwords do not match",
          },
        }}
      />

      <button
        type="submit"
        className="primary-button !mt-10 w-full text-center"
      >
        Create account
      </button>
    </form>
  );
};

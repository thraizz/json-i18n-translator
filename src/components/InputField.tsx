import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  errors: FieldErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  options?: RegisterOptions;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

export const InputField = <TFieldValues extends FieldValues>({
  name,
  label,
  errors,
  register,
  autoComplete,
  type = "text",
  options = { required: true },
  placeholder = "",
}: InputFieldProps<TFieldValues>) => (
  <div>
    <label className="flex flex-col text-sm font-medium text-zinc-200">
      {label}
      <input
        type={type}
        id={name}
        {...{ autoComplete }}
        className="block min-h-12 w-full rounded-md border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm p-2"
        placeholder={placeholder}
        {...register(name, options as any)}
        {...(errors?.[name]
          ? { "aria-invalid": true, "aria-describedby": `${name}_err` }
          : {})}
      />
    </label>
    {errors?.[name] && (
      <span id={`${name}_err`} role="alert" className="text-xs text-red-600">
        {typeof errors?.[name]?.message === "string"
          ? (errors?.[name]?.message as string)
          : ""}
      </span>
    )}
  </div>
);

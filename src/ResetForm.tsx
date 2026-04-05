import { useForm, useFormState } from "react-hook-form";

type FormValues = {
  email: string;
};

export function ResetForm() {
  const { register, handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues: { email: "" },
  });

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email", {
            validate: (value) => value !== "" || "Email is required",
          })}
        />
        <FieldError name="email" control={control} />
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
}

function FieldError({ name, control }: { name: string; control: ReturnType<typeof useForm<FormValues>>["control"] }) {
  const { errors } = useFormState({ control });
  const error = errors[name as keyof FormValues];
  if (!error) return null;

  return <span style={{ color: "red" }}>{error.message as string}</span>;
}

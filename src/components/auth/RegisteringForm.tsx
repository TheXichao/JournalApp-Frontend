import { useForm, SubmitHandler } from "react-hook-form";

// fields include to the things I defined in my database
type FormFields = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

interface RegisterFormProps {
  onRegister: (data: FormFields) => void;
}

export default function RegisterForm({ onRegister }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmitFunc: SubmitHandler<FormFields> = async (data) => {
    try {
      onRegister(data);
    } catch (e: any) {
      setError("root", { message: e.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFunc)} className="register-form">
      <input
        {...register("first_name", {
          required: "Empty first name",
        })}
        type="text"
        placeholder="first name"
      />
      <input
        {...register("last_name", {
          required: "Empty last name",
        })}
        type="text"
        placeholder="last name"
      />
      <input
        {...register("email", {
          required: "Empty email",
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        })}
        type="text"
        placeholder="email"
      />
      <input
        {...register("password", {
          required: "Empty password",
          minLength: 8,
          maxLength: 20,
        })}
        type="password"
        placeholder="password"
      />
      {errors.first_name && <div>{errors.first_name.message} </div>}
      {errors.last_name && <div>{errors.last_name.message} </div>}
      {errors.email && <div>{errors.email.message} </div>}
      {errors.password && <div>{errors.password.message}</div>}
      {isSubmitting && <div>Submitting...</div>}
      <button disabled={isSubmitting}>Register</button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
}

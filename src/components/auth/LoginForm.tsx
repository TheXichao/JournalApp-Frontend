import { useForm, SubmitHandler } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onLogin: (data: FormFields) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmitFunc: SubmitHandler<FormFields> = async (data) => {
    try {
      onLogin(data);
    } catch (e: any) {
      setError("root", { message: e.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFunc)} className="login-form">
      {/* the ... is a spreads spread operator, it is a useful shortcut which populates the <input> parameters  
      https://www.react-hook-form.com/api/useform/register/ */}

      <input
        {...register("email", {
          required: "Empty email",
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/,
        })}
        type="text"
        placeholder="email"
      />

      <input
        {...register("password", {
          required: "Empty password",
          // minLength: 8,
          // maxLength: 20,
        })}
        type="password"
        placeholder="password"
      />
      {errors.email && <div>{errors.email.message} </div>}
      {errors.password && <div>{errors.password.message}</div>}
      {isSubmitting && <div>Submitting...</div>}
      <button disabled={isSubmitting}>Login</button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
}

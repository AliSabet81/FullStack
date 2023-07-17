import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignUpData, signUpservice } from "@/api/services/auth";

const SignUpSchema = yup.object({
  username: yup.string(),
  email: yup.string(),
  password: yup.string(),
  repeatPassword: yup.string(),
});

export default function SignUp() {
  const { register, handleSubmit } = useForm<ISignUpData>({
    resolver: yupResolver(SignUpSchema),
  });
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}>
      <form
        onSubmit={handleSubmit(async (data) => {
          const res = await signUpservice(data);
          console.log(res);
        })}>
        <input placeholder="username" {...register("username")} type="text" />
        <input placeholder="email" {...register("email")} type="text" />
        <input placeholder="password" {...register("password")} type="text" />
        <input
          placeholder="repeat password"
          {...register("repeatPassword")}
          type="text"
        />
        <button type="submit">sign up</button>
      </form>
    </main>
  );
}

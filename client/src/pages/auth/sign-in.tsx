import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInData, signInservice } from "@/api/services/auth";
import Cookies from "js-cookie";
const SignUpSchema = yup.object({
  email: yup.string(),
  password: yup.string(),
});

export default function SignIn() {
  const { register, handleSubmit } = useForm<ISignInData>({
    resolver: yupResolver(SignUpSchema),
  });
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <form
        onSubmit={handleSubmit(async (data) => {
          const res = await signInservice(data);
          console.log(res);
          Cookies.set('token',res.token,{
            expires:3,
          })
        })}>
        <input {...register("email")} placeholder="email" type="text" />
        <input {...register("password")} placeholder="password" type="text" />
        <button type="submit">sign in</button>
      </form>
    </main>
  );
}

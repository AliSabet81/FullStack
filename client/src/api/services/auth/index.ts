import { instance } from "@/api/constants";

export interface ISignUpData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const signUpservice = async(data: ISignUpData) => {
  const res = await instance.post("/sign-up", data);
  return res.data;
}

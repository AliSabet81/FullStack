import { instance } from "@/api/constants";

export interface ISignUpData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export const signUpservice = async(data: ISignUpData) => {
  const res = await instance.post("/auth/sign-up", data);
  return res.data;
}
export const signInservice = async(data: ISignInData) => {
  const res = await instance.post("/auth/sign-in", data);
  return res.data;
}
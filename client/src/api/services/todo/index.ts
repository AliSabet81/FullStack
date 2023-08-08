import { instance } from "@/api/constants";
import Cookies from "js-cookie";

export type TodoType = {
  img?: string;
  title: string;
  description: string;
  _id?: string;
};

export const AddTodoService = async (data: any) => {
  const res = await instance.post("/todos/add", data);
  return res.data;
};

export const GetTodoService = async (): Promise<TodoType[]> => {
  const res = await instance.get("/todos", {
    headers: {
      Authorization: Cookies.get("token"),
    },
  });
  return res.data;
};

export const GetSingleTodoService = async (id: string): Promise<TodoType> => {
  const res = await instance.get(`/todos/${id}`);
  return res.data;
};

export const UpdateTodoService = async (id: string, data: any) => {
  const res = await instance.put(`/todos/update/${id}`,data);
  return res.data;
};

export const DeleteTodoService = async (id: string) => {
  const res = await instance.delete(`/todos/delete/${id}`);
  return res.data;
};

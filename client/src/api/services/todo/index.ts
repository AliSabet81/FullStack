import { instance } from "@/api/constants";


export const AddTodoService = async(data: any) => {
  const res = await instance.post("/todos/add", data);
  return res.data;
}
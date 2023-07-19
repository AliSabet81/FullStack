import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { AddTodoService } from "@/api/services/todo";

const AddTodoSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
});

const AddTodo = () => {
  const { register, handleSubmit } = useForm<any>({
    resolver: yupResolver(AddTodoSchema),
  });
  const [todoFile,setTodoFile] = useState<FileList | null>()
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <form
        onSubmit={handleSubmit(async (data) => {
            const formData = new FormData()
            formData.append('title',data.title)
            formData.append('description',data.description)
            formData.append('img',todoFile ? todoFile[0] : '')
            console.log(data,todoFile);
            AddTodoService(formData)
        })}>
        <input {...register("title")} placeholder="title" type="text" />
        <input {...register("description")} placeholder="description" type="text" />
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setTodoFile(e.target.files)} placeholder="description" type="file" />
        <button type="submit">add todo</button>
      </form>
    </main>
  );
};

export default AddTodo;

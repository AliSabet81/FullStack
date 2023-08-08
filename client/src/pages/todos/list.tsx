/* eslint-disable @next/next/no-img-element */
import {
  DeleteTodoService,
  GetSingleTodoService,
  GetTodoService,
  TodoType,
  UpdateTodoService,
} from "@/api/services/todo";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const EditTodoSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
});

const AddTodo = () => {
  const [todoList, setTodoList] = useState<[]>([]);
  const [updatedTodo, setUpdatedTodo] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<any>({
    resolver: yupResolver(EditTodoSchema),
  });
  const fetchTodoList = useCallback(async () => {
    const res = await GetTodoService();
    setTodoList(res.data);
  }, []);
  useEffect(() => {
    fetchTodoList();
  }, [fetchTodoList]);
  const handleEditTodo = useCallback(
    async (data) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      await UpdateTodoService(updatedTodo, formData);
      fetchTodoList();
      setUpdatedTodo(null);
    },
    [fetchTodoList, updatedTodo]
  );

  useMemo(async () => {
    if (updatedTodo) {
      const res = await GetSingleTodoService(updatedTodo);
      reset(res);
    }
  }, [reset, updatedTodo]);

  return (
    <>
      {!!updatedTodo ? (
        <form onSubmit={handleSubmit(handleEditTodo)}>
          <input {...register("title")} placeholder="title" type="text" />
          <input
            {...register("description")}
            placeholder="description"
            type="text"
          />
          <button type="submit">Edit todo</button>
        </form>
      ) : null}
      <hr />
      <ul
        className={`flex min-h-screen flex-col items-center justify-between p-24`}>
        {todoList?.map((todo: any) => (
          <li className="max-w-sm" key={todo._id}>
            <img src={`http://localhost:5000${todo.img}`} alt={todo.title} />
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => setUpdatedTodo(todo._id)}>Edit</button>
            <br />
            <button
              onClick={async() => {
                await DeleteTodoService(todo._id);
                fetchTodoList()
              }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddTodo;

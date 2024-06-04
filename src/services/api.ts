import axios from "axios";
import { Todo } from "../types/todo";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodoIds = async () => {
  return (await axiosInstance.get<Todo[]>("todos"))?.data?.map(
    (todo) => todo.id
  );
  // [1, 2, 3, 4, ...]
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`))?.data;
};

export const createTodo = async (data: Todo) => {
  return axiosInstance.post("todos", data);
};

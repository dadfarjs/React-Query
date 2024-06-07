import { useQueries, useQuery } from "@tanstack/react-query";
import { getTodo, getTodoIds } from "./api";

export const useTodosIds = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodoIds,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
  });
};

export const useTodos = (ids: (number | undefined)[] | undefined) => {
  return useQueries({
    queries: (ids ?? [])?.map((id) => {
      return {
        queryKey: ["todo", { id }],
        queryFn: () => getTodo(id!),
      };
    }),
  });
};

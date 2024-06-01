import { useQuery } from "@tanstack/react-query";
import { getTodoIds } from "./api";

export const useTodosIds = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodoIds,
    refetchOnWindowFocus: true,
  });
};

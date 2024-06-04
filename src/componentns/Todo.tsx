import React from "react";
import { useTodosIds } from "../services/queries";

const Todo = () => {
  const todoIdsQuery = useTodosIds();

  const { isPending, isError } = todoIdsQuery;

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>There is an error!</span>;
  }

  return (
    <>
      {todoIdsQuery.data.map((id) => (
        <p key={id}>{id}</p>
      ))}
    </>
  );
};

export default Todo;

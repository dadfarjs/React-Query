import { SubmitHandler, useForm } from "react-hook-form";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo as TodoType } from "../types/todo";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  Input,
  Button,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useCreateTodo } from "../services/mutations";

const Todo = () => {
  const todoIdsQuery = useTodosIds();
  const todosQueries = useTodos(todoIdsQuery.data);

  const createTodoMutation = useCreateTodo();

  const { register, handleSubmit } = useForm<TodoType>();

  const handleCreateTodoSubmit: SubmitHandler<TodoType> = (data) => {
    createTodoMutation.mutate(data);
  };

  if (todoIdsQuery?.isPending) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col justify-center items-center text-slate-200">
      <p>function status: {todoIdsQuery?.fetchStatus}</p>
      <p>data status: {todoIdsQuery?.status}</p>
      {/* {todoIdsQuery?.data?.map((id) => (
        <p key={id}>{id}</p>
      ))} */}

      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo:</h4>
        <Input
          name="full_name"
          type="text"
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          placeholder="Title"
        />
        <Input
          name="full_name"
          type="text"
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          placeholder="Description"
        />
        <Button className="w-full mx-auto text-center gap-2 rounded-md bg-gray-700 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Save changes
        </Button>
      </form>

      {todosQueries?.map(({ data }) => (
        <Disclosure
          as="div"
          className="w-full max-w-md my-5 p-5 border-2 rounded-md"
          key={data?.id}
        >
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
              {data?.title}
            </span>
            <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
          </DisclosureButton>
          <Transition
            enter="duration-200 ease-out"
            enterFrom="opacity-0 -translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="duration-300 ease-out"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-6"
          >
            <DisclosurePanel className="ms-5 mt-2 text-sm/5 text-white/50">
              {data?.description}
            </DisclosurePanel>
          </Transition>
        </Disclosure>
      ))}

      {/* <li key={data?.id}>
          <div>Id: {data?.id}</div>
          <span>
            <strong>Title:</strong> {data?.title}, {" "}
            <strong>Description:</strong> 
          </span>
        </li> */}
    </div>
  );
};

export default Todo;

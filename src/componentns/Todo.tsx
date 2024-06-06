import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo as TodoType } from "../types/todo";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  Input,
  Textarea,
  Button,
  Checkbox,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useCreateTodo } from "../services/mutations";

const Todo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const todoIdsQuery = useTodosIds();
  const todosQueries = useTodos(todoIdsQuery.data);

  const createTodoMutation = useCreateTodo();

  const { register, handleSubmit } = useForm<TodoType>();

  const handleCreateTodoSubmit: SubmitHandler<TodoType> = (data) => {
    createTodoMutation.mutate(data);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-slate-200">
      <p>function status: {todoIdsQuery?.fetchStatus}</p>
      <p>data status: {todoIdsQuery?.status}</p>

      <form
        className="w-full max-w-md"
        onSubmit={handleSubmit(handleCreateTodoSubmit)}
      >
        <h5>New Todo:</h5>
        <Input
          {...register("title")}
          type="text"
          className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          placeholder="Title"
        />
        <Textarea
          {...register("description")}
          className={clsx(
            "max-h-40",
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          placeholder="Description"
        ></Textarea>
        <Button
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create Todo"}
          className="w-full mx-auto text-center gap-2 rounded-md bg-gray-700 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Create Todo
        </Button>
      </form>

      {todoIdsQuery?.isPending ? (
        <div className="border relative border-blue-300 shadow rounded-md my-5 p-5 max-w-md w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-lg bg-slate-700 h-5 w-5"></div>
            <div className="rounded-lg bg-slate-700 h-5 w-52"></div>
            <div className="absolute right-5 rounded-lg bg-slate-700 h-5 w-5"></div>
          </div>
        </div>
      ) : (
        todosQueries?.map(({ data }) => (
          <Disclosure
            as="div"
            className="w-full max-w-md my-5 p-5 border-2 rounded-md"
            key={data?.id}
          >
            <div className="flex flex-row gap-2 items-center">
              <Checkbox
                checked={data?.checked}
                onChange={() => setIsOpen(true)}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
              >
                {/* Checkmark icon */}
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                  {data?.title}
                </span>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
              </DisclosureButton>
            </div>
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
        ))
      )}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-lg bg-slate-700 text-slate-200 p-8">
            <DialogTitle className="text-slate-50 font-bold">
              Deactivate account
            </DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div className="flex pt-10 gap-4">
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full mx-auto text-center gap-2 rounded-md bg-gray-500 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Cancel
              </Button>

              <Button
                onClick={() => setIsOpen(false)}
                className="w-full mx-auto text-center gap-2 rounded-md bg-gray-500 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Deactivate
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Todo;

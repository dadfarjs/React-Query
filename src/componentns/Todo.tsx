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
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import clsx from "clsx";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";

const Todo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [dataTodo, setDataTodo] = useState<TodoType>({} as TodoType);
  const todoIdsQuery = useTodosIds();
  const todosQueries = useTodos(todoIdsQuery.data);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<TodoType>();

  const handleCreateTodoSubmit: SubmitHandler<TodoType> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkAsDoneSubmit = (data: TodoType | undefined) => {
    if (data) updateTodoMutation.mutate({ ...data });
  };

  const handleDeleteTodo = (id: number | undefined) => {
    deleteTodoMutation.mutate(id!);
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
                defaultChecked={data?.checked}
                onChange={() => {
                  if (data) data.checked = !data.checked;
                }}
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
                <div className="flex flex-row items-center gap-3">
                  <div className="w-52 text-right">
                    <Menu>
                      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                        Options
                        <ChevronDownIcon className="size-4 fill-white/60" />
                      </MenuButton>
                      <Transition
                        enter="transition ease-out duration-75"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <MenuItems
                          anchor="bottom end"
                          className="w-52 origin-top-right rounded-xl border border-white/5 bg-slate-800 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                        >
                          <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                              <PencilIcon className="size-4 fill-white/30" />
                              Edit
                              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                ⌘E
                              </kbd>
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                              <Square2StackIcon className="size-4 fill-white/30" />
                              Duplicate
                              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                ⌘D
                              </kbd>
                            </button>
                          </MenuItem>
                          <div className="my-1 h-px bg-white/5" />
                          <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                              <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
                              Archive
                              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                ⌘A
                              </kbd>
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => {
                                setDataTodo(data ?? ({} as TodoType));
                                setIsOpenDeleteModal(true);
                              }}
                              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                            >
                              <TrashIcon className="size-4 fill-white/30" />
                              Delete
                              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                ⌘D
                              </kbd>
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                  <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                </div>
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
              <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                <Textarea
                  className={clsx(
                    "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                  onChange={(e) => {
                    if (data) data.description = e.currentTarget.value;
                  }}
                  rows={3}
                >
                  {data?.description}
                </Textarea>
                <Button
                  disabled={updateTodoMutation.isPending}
                  onClick={() => {
                    setDataTodo(data ?? ({} as TodoType));
                    setIsOpen(true);
                  }}
                  value={
                    createTodoMutation.isPending ? "Updating..." : "Update Task"
                  }
                  className="w-full mx-auto text-center gap-2 rounded-md bg-gray-700 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  Update Task
                </Button>
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
              De/activate Task
            </DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>

            <Input
              type="text"
              className={clsx(
                "mt-3 block w-full rounded-lg border-none bg-white/5 p-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
              placeholder="Title"
              defaultValue={dataTodo?.title}
              onChange={(e) => {
                setDataTodo({
                  ...dataTodo,
                  title: e.currentTarget.value,
                });
              }}
            />
            <div className="flex pt-5 gap-4">
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full mx-auto text-center gap-2 rounded-md bg-gray-500 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Cancel
              </Button>

              <Button
                onClick={async () => {
                  await handleMarkAsDoneSubmit({
                    ...dataTodo,
                    checked: !!dataTodo?.checked,
                  });
                  setIsOpen(false);
                }}
                className="w-full mx-auto text-center gap-2 rounded-md bg-gray-500 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Update
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-lg bg-slate-700 text-slate-200 p-8">
            <DialogTitle className="text-slate-50 font-bold">
              Delete Task
            </DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <div className="flex pt-5 gap-4">
              <Button
                onClick={() => setIsOpenDeleteModal(false)}
                className="w-full mx-auto text-center gap-2 rounded-md bg-gray-500 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Cancel
              </Button>

              <Button
                onClick={async () => {
                  await handleDeleteTodo(dataTodo?.id);
                  setIsOpenDeleteModal(false);
                }}
                className="w-full mx-auto text-center gap-2 rounded-md bg-gray-500 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Delete
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Todo;

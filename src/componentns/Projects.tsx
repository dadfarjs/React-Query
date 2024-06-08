import React, { useState } from "react";
import { useProjects } from "../services/queries";
import { Button } from "@headlessui/react";

const Projects = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useProjects(page);
  return (
    <div className="text-slate-50">
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3">
        <span>Current Page: {page}</span>
        <Button
          disabled={isPending}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          className="text-center gap-2 rounded-md bg-gray-700 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Previous Page
        </Button>{" "}
        <Button
          disabled={isPlaceholderData}
          onClick={() => {
            if (!isPlaceholderData) {
              setPage((old) => old + 1);
            }
          }}
          className="text-center gap-2 rounded-md bg-gray-700 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Next Page
        </Button>
      </div>
      {isFetching ? <span>Loading...</span> : null}{" "}
    </div>
  );
};

export default Projects;

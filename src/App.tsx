import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Projects = lazy(() => import("./componentns/Projects"));
const Todo = lazy(() => import("./componentns/Todo"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full mx-auto items-center justify-center">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<Todo />} />
      </Routes>
    </Suspense>
  );
}

export default App;

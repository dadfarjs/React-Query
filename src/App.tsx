import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Projects = lazy(() => import("./componentns/Projects"));
const Products = lazy(() => import("./componentns/Products"));
const Todo = lazy(() => import("./componentns/Todo"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full h-screen mx-auto items-center justify-center text-white/50">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Todo />} />
      </Routes>
    </Suspense>
  );
}

export default App;

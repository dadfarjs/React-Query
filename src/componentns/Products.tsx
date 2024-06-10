import React, { Fragment, useState } from "react";
import { useProducts } from "../services/mutations";
import { useProduct } from "../services/queries";
import { Button } from "@headlessui/react";

const Products = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const productsQuery = useProducts();
  const productQuery = useProduct(selectedProductId);

  return (
    <>
      {productsQuery.data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <Fragment key={product.id}>
              <button
                className="text-slate-200"
                onClick={() => setSelectedProductId(product.id)}
              >
                {product.name}
              </button>
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <Button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={
            !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
          className="text-center gap-2 rounded-md bg-gray-700 my-2 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          {productsQuery.isFetchingNextPage
            ? "Loading more..."
            : productsQuery.hasNextPage
            ? "Load More"
            : "nothing more to load"}
        </Button>
      </div>
      <div>Selected product:</div>
      <pre className="text-slate-200">{JSON.stringify(productQuery.data)}</pre>
    </>
  );
};

export default Products;

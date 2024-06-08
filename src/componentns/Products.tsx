import React, { Fragment, useState } from "react";
import { useProducts } from "../services/mutations";

const Products = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const productsQuery = useProducts();

  return (
    <>
      {productsQuery.data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <Fragment key={product.id}>
              <button onClick={() => setSelectedProductId(product.id)}>
                {product.name}
              </button>
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={
            productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
        >
          {productsQuery.isFetchingNextPage
            ? "Loading more..."
            : productsQuery.hasNextPage
            ? "Load More"
            : "nothing more to load"}
        </button>
      </div>
    </>
  );
};

export default Products;

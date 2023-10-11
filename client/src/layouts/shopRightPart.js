import React from "react";
import ProductList from "./productList";

const ShopRightPart = ({ products, loading, user }) => {
  return (
    <div className="row">
      {/* <div className="col-12">
        <div className="product-short">
          <h4>Short by:</h4>
          <select className="nice-select">
            <option>Name Ascending</option>
            <option>Name Descending</option>
            <option>Date Ascending</option>
            <option>Date Descending</option>
            <option>Price Ascending</option>
            <option>Price Descending</option>
          </select>
        </div>
      </div> */}
      <ProductList products={products} loading={loading} user={user} />
    </div>
  );
};

export default ShopRightPart;

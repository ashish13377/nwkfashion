import React from "react";
import SidebarProductList from "./sidebarProducts";

const ShopLeftPart = ({ products, loading }) => {
  return (
    <div>
      <div className="sidebar">
        <h4 className="sidebar-title">Popular Product</h4>

        <SidebarProductList products={products} loading={loading} />
      </div>
    </div>
  );
};

export default ShopLeftPart;

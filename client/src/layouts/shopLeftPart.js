import React from "react";
import SidebarProductList from "./sidebarProducts";

const ShopLeftPart = () => {
  return (
    <div>
      <div className="sidebar">
        <h4 className="sidebar-title">Popular Product</h4>

        <SidebarProductList />
      </div>
    </div>
  );
};

export default ShopLeftPart;

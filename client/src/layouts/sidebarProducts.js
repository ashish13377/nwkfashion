import React from "react";
import { Link } from "react-router-dom";

const SidebarProduct = ({
  imageSrc,
  title,
  price,
  oldPrice,
  rating,
  colors,
  _id,
}) => (
  <div className="sidebar-product">
    <a href="single-product.html" className="image">
      {/* imageSrc */}
      <img src={colors[0].zoomImage} alt="" />
    </a>
    <div className="content">
      <Link to={`/products/${_id}`} className="title">
        {title}
      </Link>
      <span className="price">
        {price} <span className="old">{oldPrice}</span>
      </span>
      <div className="ratting">
        {Array.from({ length: Math.floor(rating) }, (_, index) => (
          <i key={index} className="fa fa-star" />
        ))}
        {rating % 1 !== 0 && <i className="fa fa-star-half-o" />}
      </div>
    </div>
  </div>
);

const SidebarProductList = ({ products, loading }) => {
  console.log(products);
  const SelectedProductIds = [
    // "6520d39b0c24bf35eda58916",
    "6520d3250c24bf35eda5156e",
    "6520d2b20c24bf35eda497d6",
    "6520d22a0c24bf35eda40bec",
    // "6520d1af0c24bf35eda3813a",
    "6520d1370c24bf35eda31140",
    // "6520d0b40c24bf35eda29c1f",
    "6520d03d0c24bf35eda22307",
    // "6520cfc40c24bf35eda1bfdc",
    "6520cf390c24bf35eda13ba7",
    "6520cebb0c24bf35eda0c105",
    // "6520ce0b0c24bf35eda015d2",
    // "6520cd6c0c24bf35ed9f802c",
    "6520328c0c24bf35ed9c6b9e",
    // "652032020c24bf35ed9c1179",
    // "652031960c24bf35ed9bcd70",
    // "652030e30c24bf35ed9b419f",
    "6520304d0c24bf35ed9accb4",
  ];

  return (
    <div className="sidebar-product-wrap">
      {products
        .filter((product) => SelectedProductIds.includes(product._id))
        .map((product, index) => (
          <SidebarProduct key={index} {...product} />
        ))}
    </div>
  );
};

export default SidebarProductList;

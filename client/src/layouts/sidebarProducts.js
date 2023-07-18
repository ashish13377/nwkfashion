import React from "react";
import { Link } from "react-router-dom";
const sidebarProducts = [
  {
    id: "64ab9d2979afebbac80a8544",
    imageSrc: "assets/images/product/product-1.jpg",
    title: "lorem ipsum",
    price: "$25",
    oldPrice: "$38",
    rating: 4.5,
  },
  {
    id: "64ab9d3279afebbac80a8547",
    imageSrc: "assets/images/product/product-2.jpg",
    title: "lorem ipsum",
    price: "$09",
    oldPrice: "$21",
    rating: 4.5,
  },
  {
    id: "64ab9d3279afebbac80a854a",
    imageSrc: "assets/images/product/product-3.jpg",
    title: "lorem ipsum",
    price: "$18",
    oldPrice: "$29",
    rating: 4.5,
  },
  {
    id: "64ab9d3379afebbac80a854d",
    imageSrc: "assets/images/product/product-1.jpg",
    title: "lorem ipsum",
    price: "$25",
    oldPrice: "$38",
    rating: 4.5,
  },
];

const SidebarProduct = ({ imageSrc, title, price, oldPrice, rating }) => (
  <div className="sidebar-product">
    <a href="single-product.html" className="image">
      {/* imageSrc */}
      <img src={"assets/images/product/product-3.jpg"} alt="" />
    </a>
    <div className="content">
      <Link link to="/singleProductPage" className="title">
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
  const SelectedProductIds = [
    "64b646e0c86d90418da9258d",
    "64b646e4c86d90418da92594",
    "64ab9d3279afebbac80a854a",
    "64ab9d3379afebbac80a854d",
    "64b64796c86d90418da92601",
    "64b6479cc86d90418da92608",
    "64b64747c86d90418da925c7",
    "64b6474ac86d90418da925ce",
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

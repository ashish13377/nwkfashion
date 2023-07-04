import React from "react";

const sidebarProducts = [
  {
    imageSrc: "assets/images/product/product-1.jpg",
    title: "Tmart Baby Dress",
    price: "$25",
    oldPrice: "$38",
    rating: 4.5,
  },
  {
    imageSrc: "assets/images/product/product-2.jpg",
    title: "Jumpsuit Outfits",
    price: "$09",
    oldPrice: "$21",
    rating: 4.5,
  },
  {
    imageSrc: "assets/images/product/product-3.jpg",
    title: "Smart Shirt",
    price: "$18",
    oldPrice: "$29",
    rating: 4.5,
  },
  {
    imageSrc: "assets/images/product/product-1.jpg",
    title: "Tmart Baby Dress",
    price: "$25",
    oldPrice: "$38",
    rating: 4.5,
  },
  {
    imageSrc: "assets/images/product/product-2.jpg",
    title: "Jumpsuit Outfits",
    price: "$09",
    oldPrice: "$21",
    rating: 4.5,
  },
  {
    imageSrc: "assets/images/product/product-3.jpg",
    title: "Smart Shirt",
    price: "$18",
    oldPrice: "$29",
    rating: 4.5,
  },
];

const SidebarProduct = ({ imageSrc, title, price, oldPrice, rating }) => (
  <div className="sidebar-product">
    <a href="single-product.html" className="image">
      <img src={imageSrc} alt="" />
    </a>
    <div className="content">
      <a href="single-product.html" className="title">
        {title}
      </a>
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

const SidebarProductList = () => (
  <div className="sidebar-product-wrap">
    {sidebarProducts.map((product, index) => (
      <SidebarProduct key={index} {...product} />
    ))}
  </div>
);

export default SidebarProductList;

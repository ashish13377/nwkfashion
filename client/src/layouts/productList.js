import React, { useState } from "react";

// Product item component
const ProductItem = ({ imageSrc, title, price, rating, colors }) => (
  <div className="col-xl-4 col-md-6 col-12 mb-40">
    <div className="product-item">
      <div className="product-inner">
        <div className="image">
          <img src={imageSrc} alt={title} />
          <div className="image-overlay">
            <div className="action-buttons">
              <button>add to cart</button>
              <button>add to wishlist</button>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="content-left">
            <h4 className="title">
              <a href="single-product.html">{title}</a>
            </h4>
            <div className="rating">
              {Array.from({ length: rating }, (_, index) => (
                <i key={index} className="fa fa-star" />
              ))}
              {Array.from({ length: 5 - rating }, (_, index) => (
                <i key={index} className="fa fa-star-o" />
              ))}
            </div>
            <h5 className="size">
              Size: <span>S</span>
              <span>M</span>
              <span>L</span>
              <span>XL</span>
            </h5>
            <h5 className="color">
              Color:
              {colors.map((color, index) => (
                <span key={index} style={{ backgroundColor: color }} />
              ))}
            </h5>
          </div>
          <div className="content-right">
            <span className="price">{price}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Product list component
const ProductList = () => {
  const products = [
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "doop",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
    {
      imageSrc: "assets/images/product/product-1.jpg",
      title: "Dupatta",
      price: "$25",
      rating: 3.5,
      colors: ["#ffb2b0", "#0271bc", "#efc87c", "#00c183"],
    },
  ];

  const productsPerPage = 9; // Number of products to display per page
  const totalPages = Math.ceil(products.length / productsPerPage); // Calculate total pages

  const [currentPage, setCurrentPage] = useState(1); // State to track the current page

  // Calculate the start and end indexes of the products to display
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="product-list row">
        {displayedProducts.map((product, index) => (
          <ProductItem key={index} {...product} />
        ))}
      </div>

      <div className="col-12">
        <ul className="page-pagination">
          {currentPage > 1 && (
            <li>
              <a href="#" onClick={() => goToPage(currentPage - 1)}>
                <i className="fa fa-angle-left" />
              </a>
            </li>
          )}

          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
            >
              <a href="#" onClick={() => goToPage(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}

          {currentPage < totalPages && (
            <li>
              <a href="#" onClick={() => goToPage(currentPage + 1)}>
                <i className="fa fa-angle-right" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;

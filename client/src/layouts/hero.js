import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const products = [
  {
    imageSrc: "assets/images/hero/Banner-1.webp",
    title: "Product 1",
    buttonText: "Shop Now",
  },
  {
    imageSrc: "assets/images/hero/Banner-2.webp",
    title: "Product 2",
    buttonText: "Shop Now",
  },
];

const Hero = () => {
  return (
    <div className="hero-section section">
      <Carousel>
        {products.map((product, index) => (
          <div key={index}>
            <div
              className="hero-item"
              style={{
                backgroundImage: `url(${product.imageSrc})`,
              }}
            >
              <div className="hero-content">
                {/* <h1>{product.title}</h1>
                <a href="#">{product.buttonText}</a> */}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;

import Header from "../layouts/header";
import React, { useEffect, useState } from "react";
import Footer from "../layouts/footer";
import SingleProductHero from "../layouts/singleProductHero";
import SingleProductDescription from "../layouts/singleProductDescription";
import { useParams } from "react-router-dom";
import { serverAPILocal } from "../App";

import axios from "axios";

export default function SingleProductPage() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${serverAPILocal}/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);
  console.log(product);
  return (
    <div>
      <Header />
      <SingleProductHero />
      <SingleProductDescription productDetails={product} />

      <Footer />
    </div>
  );
}

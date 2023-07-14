import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import ShopHero from "../layouts/shopHero";
import ShopRightPart from "../layouts/shopRightPart";
import ShopLeftPart from "../layouts/shopLeftPart";
import { serverAPILocal } from "../App";
const ShopPage = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `${serverAPILocal}/products/category/${category}`
        );

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  // console.log(products);
  return (
    <div>
      <Header />
      <ShopHero />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row row-30 mbn-40">
            <div className="col-xl-9 col-lg-8 col-12 order-1 order-lg-2 mb-40">
              <ShopRightPart products={products} loading={loading} />
            </div>
            <div className="col-xl-3 col-lg-4 col-12 order-2 order-lg-1 mb-40">
              <ShopLeftPart products={products} loading={loading} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopPage;

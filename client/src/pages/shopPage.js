import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import ShopHero from "../layouts/shopHero";
import ShopRightPart from "../layouts/shopRightPart";
import ShopLeftPart from "../layouts/shopLeftPart";
import { serverAPILocal } from "../App";
import ContentLoader from "react-content-loader";
const ShimmerEffect = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={400}
    viewBox="0 0 280 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="20" y="0" rx="10" ry="10" width="280" height="180" />
    <rect x="20" y="190" rx="3" ry="3" width="180" height="12" />
    <rect x="20" y="210" rx="3" ry="3" width="140" height="12" />
    <rect x="20" y="230" rx="3" ry="3" width="100" height="12" />
    <rect x="20" y="260" rx="3" ry="3" width="280" height="12" />
    <rect x="20" y="280" rx="3" ry="3" width="200" height="12" />
    <rect x="20" y="300" rx="3" ry="3" width="240" height="12" />
    <rect x="20" y="330" rx="3" ry="3" width="80" height="24" />
  </ContentLoader>
);

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

  return (
    <div>
      <Header />
      <ShopHero />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row row-30 mbn-40">
            <div className="col-xl-9 col-lg-8 col-12 order-1 order-lg-2 mb-40">
              {loading ? (
                <>
                  <ShimmerEffect />
                  <ShimmerEffect />
                  <ShimmerEffect />
                </>
              ) : (
                <ShopRightPart products={products} />
              )}
            </div>
            <div className="col-xl-3 col-lg-4 col-12 order-2 order-lg-1 mb-40">
              {loading ? (
                <ShimmerEffect />
              ) : (
                <ShopLeftPart products={products} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;

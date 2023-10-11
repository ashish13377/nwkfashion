import Header from "../layouts/header";
import Footer from "../layouts/footer";
import Banner from "../layouts/banner";
import Hero from "../layouts/hero";
import axios from "axios";
import { serverAPILocal } from "../App";
import OnSale from "../layouts/onSale";
import Feature from "../layouts/feature";
import PopularProducts from "../layouts/homePopularProducts";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import React, { useState, useEffect } from "react";
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
export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverAPILocal}/products`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Hero />

      {data.length === 0 ? (
        <>
          <div style={{ textAlign: "center" }}>
            <ShimmerEffect />
            <ShimmerEffect />
            <ShimmerEffect />
            <ShimmerEffect />
          </div>
        </>
      ) : (
        <>
          <PopularProducts products={data} />
          <OnSale products={data} />
          <Feature />
        </>
      )}

      <Footer />
    </div>
  );
}

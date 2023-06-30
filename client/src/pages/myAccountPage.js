import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import MyAccountContents from "../layouts/myAccountContents";
import MyAccountHero from "../layouts/myAccountHero";

export default function LoginRegisterPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/loginRegisterPage");
    }
  }, []);

  return (
    <div>
      <Header />
      <MyAccountHero />
      <MyAccountContents />
      <Footer />
    </div>
  );
}

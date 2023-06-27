import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import MyAccountContents from "../layouts/myAccountContents";
import MyAccountHero from "../layouts/myAccountHero";
export default function loginRegisterPage() {
  return (
    <div>
      <Header />
      <MyAccountHero />
      <MyAccountContents />
      <Footer />
    </div>
  );
}

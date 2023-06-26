import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import LoginRegisterHero from "../layouts/loginRegisterHero";
import LoginRegisterForm from "../layouts/loginRegisterForm";
export default function loginRegisterPage() {
  return (
    <div>
      <Header />
      <LoginRegisterHero />
      <LoginRegisterForm />
      <Footer />
    </div>
  );
}

import React from "react";
import Hero from "../components/Hero";
import Info from "../components/Info";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="home-section">
      <Hero />
      <Info />
      <Footer />
    </div>
  );
}

export default LandingPage;

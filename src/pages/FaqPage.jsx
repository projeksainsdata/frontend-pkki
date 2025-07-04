import React from "react";
import Navbar from "../components/navbar/Navbar";
import FAQ from "../components/Faq";
import BannerCustom from "../components/HeroCustom";
import TopicsFaq from "../components/TopicsFaq";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

const FaqPage = () => {
  return (
    <>
      <Navbar />
      <BannerCustom name="Frequently Asked Questions" />

      {/* Intro Text */}
      <div className="flex flex-col items-center m-5 mt-20">
            <FAQ />
      </div>
    <Contact />
    <Footer />

    </>
  );
};

export default FaqPage;

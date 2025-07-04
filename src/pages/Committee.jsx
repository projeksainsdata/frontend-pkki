import React from "react";
import BannerCustom from "../components/HeroCustom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import {
  IconMapPin,
  IconPhoneCall,
  IconMail,
  IconBrandInstagram,
} from "@tabler/icons-react";
import StrukturTim from "../components/Tim";
import Kontakkami from "../components/Kontak";

const TentangKami = () => {
  return (
    <>
      <Navbar />
      <BannerCustom name="Tentang Kami" />

      <section className="py-20 text-colorDarkBlue">
        <StrukturTim />
        <div className="max-w-7xl mx-auto px-6 mt-10 space-y-16">
        <Kontakkami />
          {/* Google Maps */}
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3139.646461800945!2d105.3155440737678!3d-5.35533065360931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c30023a9c495%3A0x77f302ebeab5bc07!2sGedung%20Training%20Center%20(TC)%20Itera!5e1!3m2!1sid!2sid!4v1749745104774!5m2!1sid!2sid"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default TentangKami;

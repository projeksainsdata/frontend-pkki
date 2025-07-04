import React from "react";
import Navbar from "../components/navbar/Navbar";
import BannerCustom from "../components/HeroCustom";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { IconClockHour10 } from "@tabler/icons-react";

const DaftarHaki = () => {
  return (
    <>
      <Navbar />
      <BannerCustom name="Daftar HAKI" />

      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <IconClockHour10 className="w-16 h-16 text-colorGreen mb-6" />
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">Daftar HAKI ITERA</h1>
        <p className="text-colorDarkBlue text-lg md:text-xl max-w-xl mb-6">
          Fitur ini sedang dalam tahap pengembangan. Segera hadir untuk memudahkan proses pendaftaran Hak Kekayaan Intelektual oleh sivitas akademika ITERA.
        </p>
        <span className="bg-colorItera text-black px-6 py-3 rounded-full font-semibold shadow hover:bg-colorItera transition">
          Coming Soon!
        </span>
      </section>

      <Contact />
      <Footer />
    </>
  );
};

export default DaftarHaki;

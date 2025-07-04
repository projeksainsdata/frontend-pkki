import React from "react";
import Navbar from "../components/navbar/Navbar";
import BannerCustom from "../components/HeroCustom";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { IconClipboardList, IconFileCertificate, IconPresentation, IconUsers } from "@tabler/icons-react";

const layananList = [
  {
    title: "Konsultasi Kekayaan Intelektual",
    description: "Layanan konsultasi bagi sivitas akademika ITERA yang ingin mengetahui jenis HAKI yang sesuai dengan karyanya.",
    icon: <IconClipboardList className="w-8 h-8 text-colorGreen" />,
  },
  {
    title: "Pendampingan Penyusunan Dokumen HAKI",
    description: "Bimbingan teknis dan pendampingan dalam menyusun dokumen Hak Cipta, Paten, dan Desain Industri.",
    icon: <IconFileCertificate className="w-8 h-8 text-colorGreen" />,
  },
  {
    title: "Sosialisasi dan Workshop",
    description: "Kegiatan rutin berupa edukasi dan pelatihan tentang pentingnya perlindungan kekayaan intelektual.",
    icon: <IconPresentation className="w-8 h-8 text-colorGreen" />,
  },
  {
    title: "Fasilitasi Pendaftaran HAKI",
    description: "PKKI membantu proses administrasi dan teknis pendaftaran HAKI ke Direktorat Jenderal Kekayaan Intelektual (DJKI).",
    icon: <IconUsers className="w-8 h-8 text-colorGreen" />,
  },
];

const Layanan = () => {
  return (
    <>
      <Navbar />
      <BannerCustom name="Layanan PKKI" />

      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {layananList.map((layanan, index) => (
            <div
              key={index}
              className="bg-[#121212] text-colorItera p-6 rounded-xl shadow-md border border-colorGreen hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                {layanan.icon}
                <h3 className="text-xl font-semibold">{layanan.title}</h3>
              </div>
              <p className="text-gray-300">{layanan.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Contact />
      <Footer />
    </>
  );
};

export default Layanan;

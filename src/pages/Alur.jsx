import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BannerCustom from "../components/HeroCustom";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { IconArrowRight, IconCircleCheck } from '@tabler/icons-react';

const alurList = [
  {
    title: "Hak Cipta",
    steps: [
      "Unggah karya digital",
      "Isi form deskripsi karya",
      "Verifikasi & validasi",
      "Sertifikat terbit"
    ],
    link: "/alur/hak-cipta"
  },
  {
    title: "Paten",
    steps: [
      "Pengajuan permohonan",
      "Pemeriksaan administratif",
      "Pemeriksaan substantif",
      "Terbit sertifikat paten"
    ],
    link: "/alur/paten"
  },
  {
    title: "Paten Sederhana",
    steps: [
      "Pengajuan online",
      "Pemeriksaan singkat",
      "Persetujuan cepat",
      "Penerbitan hak eksklusif"
    ],
    link: "/alur/paten-sederhana"
  },
  {
    title: "Desain Industri",
    steps: [
      "Unggah sketsa desain",
      "Deskripsi bentuk & fungsi",
      "Pemeriksaan kelayakan",
      "Terbit sertifikat desain"
    ],
    link: "/alur/desain-industri"
  }
];

const Alur = () => {
  return (
    <>
      <Navbar />
      <BannerCustom name="Alur Pendaftaran HAKI" />

      <main className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-colorGreen mb-12">
          Pilih Jenis HAKI yang Ingin Didaftarkan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alurList.map((alur, index) => (
            <div
              key={index}
              className="bg-[#121212] border border-colorGreen rounded-xl p-6 flex flex-col justify-between transition hover:shadow-xl"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white font-spaceGrotesk">{alur.title}</h3>
                <ul className="space-y-2">
                  {alur.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white text-sm">
                      <IconCircleCheck className="text-colorGreen mt-1" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Link to={alur.link}>
                  <button className="w-full flex justify-center items-center gap-2 rounded-full px-4 py-2 bg-colorGreen text-black font-semibold hover:bg-transparent hover:text-colorGreen border border-colorGreen transition">
                    Lihat Detail Alur <IconArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Contact />
      <Footer />
    </>
  );
};

export default Alur;

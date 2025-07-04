import React from "react";
import Navbar from "../components/navbar/Navbar";
import BannerCustom from "../components/HeroCustom";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import Flyer from "../assets/images/flyer-lomba-paten2-01.png";
import {
  IconCalendarEvent,
  IconZoomQuestion,
  IconFileText,
  IconCheck,
} from "@tabler/icons-react";

const LombaSpesifikasiPaten = () => {
  return (
    <>
      <Navbar />
      <BannerCustom name="Lomba Spesifikasi Paten 2025" />

      <section className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {/* Flyer dan Info berdampingan di layar besar */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Gambar Flyer */}
          <div className="w-full lg:w-1/2">
            <img
              src={Flyer}
              alt="Lomba Menulis Spesifikasi Paten ITERA"
              className="rounded-xl w-full shadow-lg"
            />
          </div>

          {/* Info Ringkas */}
          <div className="w-full lg:w-1/2 bg-[#121212] text-white p-8 rounded-xl space-y-6 shadow-md">
            <h2 className="text-2xl font-bold text-colorGreen">Tentang Lomba</h2>
            <p>
              Pusat Kelola Karya Intelektual ITERA bekerja sama dengan Lembaga
              Penjaminan Mutu dan Pengembangan Pembelajaran mengadakan
              <strong> Lomba Menulis Spesifikasi Paten ITERA 2025</strong>. Lomba ini
              ditujukan untuk meningkatkan kemampuan sivitas akademika dalam
              memahami dan membuat dokumen paten.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="flex items-start gap-3">
                <IconZoomQuestion className="text-colorGreen mt-1" />
                <div>
                  <h4 className="font-semibold">Sosialisasi & Technical Meeting</h4>
                  <p>26 Juni 2025 – 09.00-11.00 WIB (via Zoom)</p>
                  <a
                    href="https://s.id/sosialisasi-lomba-paten2025"
                    className="text-colorGreen hover:underline text-sm"
                  >
                    s.id/sosialisasi-lomba-paten2025
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IconFileText className="text-colorGreen mt-1" />
                <div>
                  <h4 className="font-semibold">Unggah Spesifikasi Paten</h4>
                  <p>Batas akhir: 31 Juli 2025</p>
                  <a
                    href="https://bit.ly/deskripsi-lombapaten-2025"
                    className="text-colorGreen hover:underline text-sm"
                  >
                    bit.ly/deskripsi-lombapaten-2025
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IconCalendarEvent className="text-colorGreen mt-1" />
                <div>
                  <h4 className="font-semibold">Pengumpulan Media</h4>
                  <p>Batas akhir: 4 Agustus 2025</p>
                  <p className="text-sm text-gray-300">
                    Bentuk: video, poster, atau prototipe
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IconCheck className="text-colorGreen mt-1" />
                <div>
                  <h4 className="font-semibold">Penjurian & Pengumuman</h4>
                  <p>Agustus–Oktober 2025</p>
                  <p className="text-sm text-gray-300">
                    Lihat panduan teknis untuk detail revisi & penilaian
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pendaftaran */}
        <div className="bg-colorGreen/10 border border-colorGreen rounded-xl p-6 text-center space-y-4">
          <h3 className="text-2xl font-bold text-colorGreen">Daftar Sekarang</h3>
          <p className="text-gray-700">
            Isi formulir pendaftaran melalui tautan berikut:
          </p>
          <a
            href="https://s.id/Lomba-Paten-Itera2025"
            className="inline-block bg-colorGreen text-white px-6 py-3 rounded-full font-semibold hover:bg-colorItera transition"
          >
            s.id/Lomba-Paten-Itera2025
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </>
  );
};

export default LombaSpesifikasiPaten;

import React from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import pkki1 from "../assets/images/liris.jpg";
import pkki2 from "../assets/images/pkki1.jpg";
import pkki3 from "../assets/images/pkki2.jpg";
import pkki4 from "../assets/images/tim.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 md:px-16 mt-10 font-spaceGrotesk">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl w-full">

      {/* Galeri Gambar dengan Overlay Gradient */}
      <div className="grid grid-cols-2 gap-4 w-full md:w-1/2 order-last md:order-first">
        {[pkki1, pkki2, pkki3, pkki4].map((img, i) => (
          <div key={i} className="relative rounded-lg overflow-hidden shadow-lg group">
            <img
              src={img}
              alt={`pkki-${i + 1}`}
              className="object-cover w-full h-36 md:h-40 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#3a476780] via-[#3867a680] to-[#735ba7cc] opacity-80"></div>
          </div>
        ))}
      </div>


        {/* Teks di Kanan */}
        <div className="text-colorGreen flex flex-col gap-10 w-full md:w-1/2">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-colorItera">Mendorong Inovasi - Melindungi Karya</h2>
            <p className="font-plusJakarta text-colorDarkBlue">
              PKKI didukung oleh tim ahli yang berdedikasi dalam pengelolaan kekayaan intelektual, siap mendampingi proses administrasi, pelatihan, dan advokasi.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-colorDarkBlue">
            <h1 className="text-4xl font-bold">Tentang PKKI</h1>
            <p className="font-plusJakarta font-medium text-colorDarkBlue">
              PKKI berperan sebagai pusat informasi dan layanan untuk pengajuan Hak Kekayaan Intelektual (HKI), baik dalam bentuk hak cipta, paten, maupun kekayaan intelektual lainnya. Tujuan utamanya adalah mendorong inovasi, perlindungan karya, dan kontribusi nyata terhadap pengembangan ilmu pengetahuan dan teknologi di Indonesia.
            </p>
            <Link to="/information">
              <button className="flex items-center gap-3 bg-colorGreen px-5 py-2 font-bold rounded-full w-fit text-lg text-colorItera hover:bg-[#181818] hover:text-colorGreen border border-colorGreen">
                Tim PKKI <IconArrowRight />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;

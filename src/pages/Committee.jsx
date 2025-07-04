import React from "react";
import BannerCustom from "../components/HeroCustom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import {
  IconMapPin,
  IconPhoneCall,
  IconMail,
  IconBrandInstagram,
} from "@tabler/icons-react";

const TentangKami = () => {
  return (
    <>
      <Navbar />
      <BannerCustom name="Kontak Kami" />

      <section className="py-20 text-colorDarkBlue">
        <div className="max-w-7xl mx-auto px-6 mt-10 space-y-16">
          {/* Judul */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Hubungi PKKI ITERA</h1>
            <p className="text-gray-400 mt-2">Kami siap membantu Anda dalam pengurusan HAKI di kampus ITERA.</p>
          </div>

          {/* Kontak Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#121212] p-6 rounded-xl border border-white/10 hover:border-colorGreen transition">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <IconMapPin className="text-colorGreen" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-colorItera mb-1">Alamat</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Gedung Training Center, Jalan Terusan Ryacudu, Way Hui, Kecamatan Jatiagung, Lampung Selatan 35365.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] p-6 rounded-xl border border-white/10 hover:border-colorGreen transition">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <IconPhoneCall className="text-colorGreen" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-colorItera mb-1">Call / WhatsApp</h4>
                  <p className="text-gray-300 text-sm">Mentari:<br />+62 852-8062-0763</p>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] p-6 rounded-xl border border-white/10 hover:border-colorGreen transition">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <IconMail className="text-colorGreen" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-colorItera mb-1">Email</h4>
                  <p className="text-gray-300 text-sm">hki@itera.ac.id</p>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] p-6 rounded-xl border border-white/10 hover:border-colorGreen transition">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <IconBrandInstagram className="text-colorGreen" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-colorItera mb-1">Instagram</h4>
                  <p className="text-gray-300 text-sm">@hkiitera</p>
                </div>
              </div>
            </div>
          </div>

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

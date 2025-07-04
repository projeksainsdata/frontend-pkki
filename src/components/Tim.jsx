import React from "react";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";

import kepala from "../assets/images/struktur/Liris.jpg";
import wakil from "../assets/images/struktur/Devia.jpg";
import selvi from "../assets/images/struktur/Selvi.png";
import naura from "../assets/images/struktur/Naura.png";
import gilang from "../assets/images/struktur/Gilang.png";
import azry from "../assets/images/struktur/Azry.jpg";
import yunita from "../assets/images/struktur/Yunita.jpg";
import mentari from "../assets/images/struktur/Mentari.jpeg";
import een from "../assets/images/struktur/Een.png";
import imam from "../assets/images/struktur/Imam.jpg";
import putri from "../assets/images/struktur/Putri.jpg";
import nurul from "../assets/images/struktur/Nurul.jpg";
import ardika from "../assets/images/struktur/Ardika.png";

import pkki1 from "../assets/images/pkki/pkki1.jpg";
import pkki2 from "../assets/images/pkki/pkki2.jpg";
import pkki3 from "../assets/images/pkki/pkki3.jpg";
import pkki4 from "../assets/images/pkki/pkki4.jpg";
import pkki5 from "../assets/images/pkki/pkki5.jpg";
import pkki6 from "../assets/images/pkki/pkki6.jpg";

const StrukturTim = () => {
    const kepalaDanWakil = [
        { name: "apt. Tantri Liris Nareswari, S.Farm., M.S.Farm.", role: "Kepala PKKI", img: kepala },
        { name: "Devia Gahana Cindi Alfian, S.T., M.Sc.", role: "Wakil Kepala PKKI", img: wakil },
    ];

    const anggotaTim = [
        { name: "Selvi Misnia Irawati, S.Si., M.T.", role: "Pemeriksaan Administratif Paten", img: selvi },
        { name: "apt. Naura Nurnahari, M.S.Farm.", role: "Pendaftaran Paten", img: naura },
        { name: "M. Gilang Indra Mardika, S.T., M.T.", role: "Pendaftaran Paten", img: gilang },
        { name: "Azry Ayu Nabillah, S.Pd., M.Pd.", role: "Pemeriksaan Pasca Pendaftaran (Administratif)", img: azry },
        { name: "Yunita Fahni, S.T., M.T.", role: "Pemeriksaan Pasca Pendaftaran (Substantif)", img: yunita },
        { name: "Mentari Pratami, S.Si. M.Si", role: "Divisi Hak Cipta", img: mentari },
        { name: "Een Lujainatul Isnaini, S.T., M.Eng.", role: "Divisi Hak Cipta", img: een },
        { name: "Imam Safei. S.Pd., M.Pd.", role: "Divisi Hak Cipta", img: imam },
        { name: "Putri Agustryani, S.T., M.T.", role: "Divisi Desain Industri", img: putri },
        { name: "Nurul Adha, S.S.I, M.A.", role: "Divisi Merek, Desain & Website", img: nurul },
        { name: "Ardika Satria, M.Si.", role: "Divisi Merek, Desain & Website", img: ardika },
    ];

    return (
        <>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-10 order-last md:order-first">
            {[pkki1, pkki2, pkki3, pkki4, pkki5, pkki6].map((img, i) => (
                <div
                key={i}
                className="relative rounded-lg overflow-hidden shadow-lg group aspect-[4/3]"
                >
                <img
                    src={img}
                    alt={`pkki-${i + 1}`}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-transparent opacity-80"></div>
                </div>
            ))}
        </div>  

            {/* Section 1: Intro PKKI */}
            <section className="py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center justify-center text-center gap-10 mb-16">
                        <div className="text-colorGreen flex flex-col gap-10 w-full md:w-2/3">
                            <div className="flex flex-col gap-3">
                                <h2 className="text-2xl font-bold text-colorItera">Mendorong Inovasi - Melindungi Karya</h2>
                                <p className="font-plusJakarta text-DarkBlue">
                                    PKKI didukung oleh tim ahli yang berdedikasi dalam pengelolaan kekayaan intelektual, siap mendampingi proses administrasi, pelatihan, dan advokasi.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4 text-colorItera">
                                <h1 className="text-4xl font-bold">Tentang PKKI</h1>
                                <p className="font-plusJakarta font-medium text-black">
                                    PKKI berperan sebagai pusat informasi dan layanan untuk pengajuan Hak Kekayaan Intelektual (HKI), baik dalam bentuk hak cipta, paten, maupun kekayaan intelektual lainnya. Tujuan utamanya adalah mendorong inovasi, perlindungan karya, dan kontribusi nyata terhadap pengembangan ilmu pengetahuan dan teknologi di Indonesia.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Struktur Tim */}
            <section className="bg-gradient-to-b from-[#121212] to-[#6963ac] to-[900%] rounded-b-2xl md:rounded-t-[80px] font-spaceGrotesk px-5 py-16 md:px-20 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Kepala & Wakil */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                        {kepalaDanWakil.map((member, i) => (
                            <div key={i} className="bg-[#181818] border border-white/10 rounded-xl p-5 text-white flex flex-col items-center hover:shadow-xl transition">
                                <img src={member.img} alt={member.name} className="w-32 h-32 object-cover rounded-full border border-colorGreen mb-4" />
                                <h3 className="font-bold text-colorItera text-center">{member.name}</h3>
                                <p className="text-sm text-gray-300 text-center mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>

                    {/* Anggota Tim Lain */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {anggotaTim.map((member, i) => (
                            <div key={i} className="bg-[#181818] border border-white/10 rounded-xl p-5 text-white flex flex-col items-center hover:shadow-xl transition">
                                <img src={member.img} alt={member.name} className="w-32 h-32 object-cover rounded-full border border-colorGreen mb-4" />
                                <h3 className="font-bold text-colorItera text-center">{member.name}</h3>
                                <p className="text-sm text-gray-300 text-center mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default StrukturTim;

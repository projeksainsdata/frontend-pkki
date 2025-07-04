import React from "react";
import { Link } from "react-router-dom";
import { IconArrowRight } from '@tabler/icons-react';

const Trip = () => {
    return (
        <div className="mb-10">
            <div className="tripBanner font-plusJakarta flex items-center justify-center">
                <div className="relative z-10 flex gap-3">
                    <a
                        href="https://hki.proyekai.com/login"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-colorGreen flex w-fit py-2 px-5 items-center rounded-full gap-1 text-white font-bold hover:bg-colorItera transition duration-300">
                            Daftarkan HAKI
                            <IconArrowRight className="w-5" />
                        </button>
                    </a>
                    <Link to="/infografis">
                        <button className="bg-colorItera flex w-fit py-2 px-5 items-center rounded-full gap-1 text-black font-bold hover:bg-colorGreen transition duration-300">
                            Lihat Daftar HAKI
                            <IconArrowRight className="w-5" />
                        </button>
                    </Link>
                </div>
            </div>
            <div className="font-bold mt-[25px]"></div>
        </div>
    );
};

export default Trip;

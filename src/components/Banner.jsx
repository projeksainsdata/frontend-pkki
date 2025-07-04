import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/images/hero2-01.png";
import lpmpp from "../assets/images/lpmpp-01.png";

const Banner = () => {
  const handleLoginClick = () => {
    window.location.href = "https://hki.proyekai.com/login";
  };

return (
    <div className="bannerHome h-screen relative md:-mt-[120px] overflow-hidden">
        <div className="overlay"></div>
        <img
            src={hero}
            alt="hero"
            className="object-cover w-full h-full absolute"
            loading="lazy"
        />
        <div className="bannerContent z-10 relative font-spaceGrotesk h-full flex flex-col items-center justify-center text-center md:items-start md:text-left px-5 md:px-12 mx-4 md:mx-8">
            <p className="text-white">Lembaga Penjaminan Mutu dan Pengembangan Pembelajaran</p>
            <h1 className="text-2xl sm:text-2xl md:text-4xl lg:text-5xl text-white mb-4 font-bold">
                <span className="font-extrabold text-colorItera">
                    Pusat Kelola Karya Intelektual
                </span> <br />
                <span className="text-colorGreen">
                    Institut Teknologi Sumatera
                </span>
            </h1>

            <div className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start">
                <button
                    onClick={handleLoginClick}
                    className="bg-colorGreen text-white px-6 py-3 rounded-full hover:bg-colorItera transition duration-300"
                >
                    Login
                </button>
                <Link
                    to="https://hki.proyekai.com/login"
                    className="bg-colorGreen text-white px-6 py-3 rounded-full hover:bg-colorItera transition duration-300"
                >
                    Login SSO
                </Link>
            </div>
        </div>

        <ul className="circles absolute top-0 left-0 w-full h-full pointer-events-none">
            <li></li><li></li><li></li><li></li><li></li>
            <li></li><li></li><li></li><li></li><li></li>
        </ul>
    </div>
);
};

export default Banner;

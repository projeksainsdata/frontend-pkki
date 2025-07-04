import React from "react";
import { Link } from "react-router-dom";
import { IconArrowRight } from '@tabler/icons-react';
import logoFooter from '../assets/images/icon-pkki.svg'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <div className="footer w-full mt-20 bg-[#181818] text-white">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-5 border-t border-white border-opacity-10">
                <img src={logoFooter} width={40} alt="PKKI ITERA Logo" />
                <p className="font-plusJakarta text-white text-xs md:text-sm flex items-center gap-1">
                Made with <span role="img" aria-label="love">❤️</span> Tim PKKI ITERA ©️ {currentYear}
                </p>
            </div>
            </div>

        </>
    )
}

export default Footer
import React from "react";
import { Link } from "react-router-dom";
import { IconArrowRight } from '@tabler/icons-react';
import logoFooter from '../assets/images/icon-pkki.svg'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
        <div className="flex items-center justify-between mx-10 py-5 mt-[8em] border-t border-white border-opacity-10">
            <img src={logoFooter} width={40} alt="PKKI ITERA Logo" />
            <p className="font-plusJakarta text-white text-xs md:text-sm flex items-center gap-1">
                Made with <span role="img" aria-label="love">❤️</span> Tim PKKI ITERA ©️ {currentYear}
            </p>
        </div>
        </>
    )
}

export default Footer
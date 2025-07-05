import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/images/logo-dark.svg"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Timer for dropdown delay
  let dropdownTimeout = null;

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // Delay before closing dropdown
  };

  return (
    <nav className={`navbar md:sticky ${isSticky ? 'navbar-fixed' : 'absolute'}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src={Logo} alt="Logo" className='w-80 md:w-80' />
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4 font-spaceGrotesk font-bold">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button
              className={`nav-link relative flex items-center gap-1 hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-colorItera after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
            >
              Informasi
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-48 bg-colorGreen text-white rounded shadow-lg z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/berita" className="block px-4 py-2 hover:bg-colorItera">Berita</Link>
                <Link to="/panduan" className="block px-4 py-2 hover:bg-colorItera">Panduan</Link>
                <Link to="/alur" className="block px-4 py-2 hover:bg-colorItera">Alur</Link>
                <Link to="/lomba" className="block px-4 py-2 hover:bg-colorItera">Lomba Spesifikasi Paten</Link>
              </div>
            )}
          </div>
          <Link
            to="/layanan"
            className={`nav-link relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-colorItera after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
          >
            Layanan
          </Link>
          <Link
            to="/infografis"
            className={`nav-link relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-colorItera after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
          >
            Infografis
          </Link>
          <Link
            to="/faqs"
            className={`nav-link relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-colorItera after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
          >
            FAQs
          </Link>
          <Link
            to="/tentang-kami"
            className={`nav-link relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-colorItera after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
          >
            Tentang Kami
          </Link>
          <Link to="https://s.id/hki-itera" className={`nav-link ${isSticky ? 'bg-colorItera text-colorGreen' : 'bg-colorGreen text-colorItera'} px-4 py-2 rounded-full`}>Daftarkan HAKI</Link>
          {isLoggedIn && (
            <Link
              to="/admin"
              className={`nav-link ${isSticky ? 'bg-white text-black' : 'bg-white text-black'} px-4 py-2 rounded-full`}
            >
              Admin
            </Link>
          )}

        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={`nav-link ${isSticky ? 'text-white' : 'text-white'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className={`md:hidden p-2 font-spaceGrotesk font-medium ${isSticky ? 'bg-[#121212] bg-opacity-40 font-bold text-white' : 'bg-[#6963ac] font-bold text-white'}`}>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="block nav-link py-2 mx-4 w-full text-left relative flex items-center gap-1 hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0"
            >
              Informasi
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="ml-4 mb-2 rounded shadow-lg bg-colorGreen text-white z-50">
                <Link to="/berita" className="block px-4 py-2 hover:bg-colorItera">Berita</Link>
                <Link to="/panduan" className="block px-4 py-2 hover:bg-colorItera">Panduan</Link>
                <Link to="/alur" className="block px-4 py-2 hover:bg-colorItera">Alur</Link>
                <Link to="/lomba" className="block px-4 py-2 hover:bg-colorItera">Lomba Spesifikasi Paten</Link>
              </div>
            )}
          </div>
          <Link to="/layanan" className="block nav-link py-2 mx-4 relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0">Layanan</Link>
          <Link to="/infografis" className="block nav-link py-2 mx-4 relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0">Infografis</Link>
          <Link to="/faqs" className="block nav-link py-2 mx-4 relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0">FAQs</Link>
          <Link to="/tentang-kami" className="block nav-link py-2 mx-4 relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0">Tentang Kami</Link>
          <Link to="https://s.id/hki-itera" className="block nav-link bg-colorGreen mx-4 px-4 py-2 text-colorItera rounded-full my-3">Daftarkan HAKI</Link>
          {isLoggedIn && (
            <Link to="/admin" className="block nav-link bg-white mx-4 px-4 py-2 text-black rounded-full my-3">Admin</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

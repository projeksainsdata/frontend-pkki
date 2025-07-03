import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/images/logo-dark.svg"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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

  return (
    <nav className={`navbar md:sticky ${isSticky ? 'navbar-fixed' : 'absolute'}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src={Logo} alt="Logo" className='w-80 md:w-80' />
          </Link>
        </div>
        <div className="hidden md:flex space-x-4 font-bold font-raleway">
          <Link
            to="/informasi"
            className={`nav-link relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
          >
            Informasi
          </Link>
          <Link
            to="/layanan"
            className={`nav-link relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
          >
            Layanan
          </Link>
          <Link
            to="/infografis"
            className={`nav-link relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
          >
            Infografis
          </Link>
          <Link
            to="/faqs"
            className={`nav-link relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
          >
            FAQs
          </Link>
          <Link
            to="/haki"
            className={`nav-link relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
          >
            HAKI
          </Link>
          <Link
            to="/tentang-kami"
            className={`nav-link relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0 ${isSticky ? 'text-white' : 'text-white'}`}
          >
            Tentang Kami
          </Link>
        </div>
        <div className="hidden md:flex space-x-4 font-spaceGrotesk font-bold">
          <Link to="#" className={`nav-link ${isSticky ? 'bg-colorGreen text-black' : 'bg-colorGreen text-black'} px-4 py-2 rounded-full`}>Daftarkan HAKI</Link>
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
          <Link to="/" className="block nav-link py-2 mx-4 relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0">Informasi</Link>
          <Link to="/program" className="block nav-link py-2 mx-4 relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0">Layanan</Link>
          <Link to="/author" className="block nav-link py-2 mx-4 relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0">Infografis</Link>
          <Link to="/committee" className="block nav-link py-2 mx-4 relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0">FAQs</Link>
          <Link to="/information" className="block nav-link py-2 mx-4 relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0">HAKI</Link>
          <Link to="/schedule" className="block nav-link py-2 mx-4 relative hover:after:w-full after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:w-0">Tentang Kami</Link>
          <Link to="#" className="block nav-link bg-colorGreen mx-4 px-4 py-2 text-black rounded-full my-3">Daftarkan HAKI</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

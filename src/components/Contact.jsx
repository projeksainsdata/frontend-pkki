import React from 'react';
import { IconBrandGithub, IconBrandYoutube,IconBrandInstagram, IconMail} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const ConnectWithUs = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-10 mt-32 gap-5">
      <div className="flex flex-col md:flex-row text-white items-center justify-between w-full">
        <h1 className="text-5xl font-spaceGrotesk font-bold text-center md:text-left">Kontak Kami</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <Link className='bg-black py-3 px-5 rounded text-md text-center text-white w-full'>+6285643290340 (Selvi-Paten)</Link>
        <Link className='bg-black py-3 px-5 rounded text-md text-center text-white w-full'>+6285280620763 (Mentari-Hakcipta)</Link>
        <Link className='bg-black py-3 px-5 rounded text-md text-center text-white w-full'>+6281373862262 (Putri-Desain Industri)</Link>
        <div className="flex gap-3 justify-center w-full md:w-auto">
          <a href="mailto:hki@itera.ac.id" className="bg-black p-3 rounded text-gray-400 hover:text-white flex justify-center items-center w-full md:w-auto">
            <IconMail />
          </a>
          <Link to={"/"} className="bg-black p-3 rounded text-gray-400 hover:text-white flex justify-center items-center w-full md:w-auto">
            <IconBrandInstagram />
          </Link>
        </div>
      </div>
      {/* Layanan Pengaduan Section */}
      <div className="flex flex-col items-center w-full mt-8">
        <p className="font-plusJakarta text-center mb-3 text-white max-w-2xl">
          Layanan Pengaduan Pusat Kelola Karya Intelektual hadir untuk menampung dan menindaklanjuti segala bentuk pelanggaran, penyalahgunaan, atau sengketa terkait hak kekayaan intelektual secara cepat, aman, dan terpercaya.
        </p>
        <Link
          className="bg-colorGreen py-3 px-5 rounded text-md text-center text-white w-full md:w-auto font-semibold hover:bg-blue-700 transition-colors"
          to="/layanan-pengaduan"
        >
          Layanan Pengaduan
        </Link>
      </div>
    </div>
  );
};

export default ConnectWithUs;

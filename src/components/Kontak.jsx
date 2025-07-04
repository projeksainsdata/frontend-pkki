import React from 'react';
import { IconBrandGithub, IconBrandYoutube,IconBrandInstagram, IconMail} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const Kontakkami = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-10 mt-32 gap-5">
    <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Hubungi PKKI ITERA</h1>
        <p className="text-gray-400 mt-2">Kami siap membantu Anda dalam pengurusan HAKI di kampus ITERA.</p>
    </div>
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <Link to={"https://api.whatsapp.com/send/?phone=6285643290340&amp;text&amp;type=phone_number&amp;app_absent=0"} className='bg-colorUngu py-3 px-5 rounded text-md text-center text-white w-full flex items-center justify-center gap-2'>
          {/* WhatsApp Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12.004 2.003a9.994 9.994 0 0 0-8.68 14.99l-1.31 3.81a1 1 0 0 0 1.26 1.26l3.81-1.31a9.994 9.994 0 1 0 4.92-18.75Zm0 2a8 8 0 1 1 0 16 7.96 7.96 0 0 1-4.09-1.13 1 1 0 0 0-.82-.09l-2.89.99.99-2.89a1 1 0 0 0-.09-.82A8 8 0 0 1 12.004 4.003Zm-2.13 4.13c-.21-.47-.43-.48-.63-.49h-.54c-.19 0-.5.07-.76.36-.26.29-.99.97-.99 2.36 0 1.39 1.01 2.73 1.15 2.92.14.19 1.97 3.16 4.86 4.3.68.27 1.21.43 1.62.55.68.21 1.3.18 1.79.11.55-.08 1.68-.69 1.92-1.36.24-.67.24-1.25.17-1.36-.07-.11-.26-.17-.54-.3-.28-.13-1.68-.83-1.94-.92-.26-.09-.45-.13-.64.13-.19.26-.74.92-.91 1.11-.17.19-.34.21-.62.08-.28-.13-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.56-1.93-.17-.28-.02-.43.12-.56.13-.13.28-.34.42-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.59-.9-2.17Z"/></svg>
          Selvi-Paten
        </Link>
        <Link to={"https://api.whatsapp.com/send/?phone=6285280620763&amp;text&amp;type=phone_number&amp;app_absent=0"} className='bg-colorUngu py-3 px-5 rounded text-md text-center text-white w-full flex items-center justify-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12.004 2.003a9.994 9.994 0 0 0-8.68 14.99l-1.31 3.81a1 1 0 0 0 1.26 1.26l3.81-1.31a9.994 9.994 0 1 0 4.92-18.75Zm0 2a8 8 0 1 1 0 16 7.96 7.96 0 0 1-4.09-1.13 1 1 0 0 0-.82-.09l-2.89.99.99-2.89a1 1 0 0 0-.09-.82A8 8 0 0 1 12.004 4.003Zm-2.13 4.13c-.21-.47-.43-.48-.63-.49h-.54c-.19 0-.5.07-.76.36-.26.29-.99.97-.99 2.36 0 1.39 1.01 2.73 1.15 2.92.14.19 1.97 3.16 4.86 4.3.68.27 1.21.43 1.62.55.68.21 1.3.18 1.79.11.55-.08 1.68-.69 1.92-1.36.24-.67.24-1.25.17-1.36-.07-.11-.26-.17-.54-.3-.28-.13-1.68-.83-1.94-.92-.26-.09-.45-.13-.64.13-.19.26-.74.92-.91 1.11-.17.19-.34.21-.62.08-.28-.13-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.56-1.93-.17-.28-.02-.43.12-.56.13-.13.28-.34.42-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.59-.9-2.17Z"/></svg>
          Mentari-Hakcipta
        </Link>
        <Link to={"https://api.whatsapp.com/send/?phone=6281373862262&amp;text&amp;type=phone_number&amp;app_absent=0"} className='bg-colorUngu py-3 px-5 rounded text-md text-center text-white w-full flex items-center justify-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12.004 2.003a9.994 9.994 0 0 0-8.68 14.99l-1.31 3.81a1 1 0 0 0 1.26 1.26l3.81-1.31a9.994 9.994 0 1 0 4.92-18.75Zm0 2a8 8 0 1 1 0 16 7.96 7.96 0 0 1-4.09-1.13 1 1 0 0 0-.82-.09l-2.89.99.99-2.89a1 1 0 0 0-.09-.82A8 8 0 0 1 12.004 4.003Zm-2.13 4.13c-.21-.47-.43-.48-.63-.49h-.54c-.19 0-.5.07-.76.36-.26.29-.99.97-.99 2.36 0 1.39 1.01 2.73 1.15 2.92.14.19 1.97 3.16 4.86 4.3.68.27 1.21.43 1.62.55.68.21 1.3.18 1.79.11.55-.08 1.68-.69 1.92-1.36.24-.67.24-1.25.17-1.36-.07-.11-.26-.17-.54-.3-.28-.13-1.68-.83-1.94-.92-.26-.09-.45-.13-.64.13-.19.26-.74.92-.91 1.11-.17.19-.34.21-.62.08-.28-.13-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.56-1.93-.17-.28-.02-.43.12-.56.13-.13.28-.34.42-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.59-.9-2.17Z"/></svg>
          Putri-Desain Industri
        </Link>
        <div className="flex gap-3 justify-center w-full md:w-auto">
          <a href="mailto:hki@itera.ac.id" className="bg-colorGreen p-3 rounded text-gray-400 hover:text-white flex justify-center items-center w-full md:w-auto">
            <IconMail />
          </a>
          <Link to={"/"} className="bg-colorGreen p-3 rounded text-gray-400 hover:text-white flex justify-center items-center w-full md:w-auto">
            <IconBrandInstagram />
          </Link>
        </div>
      </div>
      {/* Layanan Pengaduan Section */}
      <div className="flex flex-col items-center w-full mt-8">
        <p className="font-plusJakarta text-center mb-3 text-colorDarkBlue max-w-2xl">
          Layanan Pengaduan Pusat Kelola Karya Intelektual hadir untuk menampung dan menindaklanjuti segala bentuk pelanggaran, penyalahgunaan, atau sengketa terkait hak kekayaan intelektual secara cepat, aman, dan terpercaya.
        </p>
        <Link
          className="bg-colorGreen py-3 px-5 rounded text-md text-center text-colorItera w-full md:w-auto font-semibold hover:bg-colorUngu transition-colors"
          to="/layanan-pengaduan"
        >
          Layanan Pengaduan
        </Link>
         {/* Google Maps */}
      </div>
    </div>
  );
};

export default Kontakkami;

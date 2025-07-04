import Navbar from "../../components/navbar/Navbar";
import BannerCustom from "../../components/HeroCustom";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import BlogImage from "../../assets/images/pkki2.jpg"; // ganti dengan gambar kamu

const Berita = () => {
  return (
    <>
      <Navbar />
      <BannerCustom name="Berita Terkini" />

      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Post 1 */}
          <div className="rounded-xl shadow-lg overflow-hidden bg-white">
            <img
              src={BlogImage}
              alt="Gambar Berita"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">12 Juli 2025 • Inovasi</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                <Link to="/berita/1" className="hover:text-red-600 transition">
                  Kolaborasi Mahasiswa dengan UMKM Lokal
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Mahasiswa ITERA menciptakan teknologi tepat guna untuk mendukung UMKM Lampung.
              </p>
              <Link
                to="/berita/1"
                className="inline-block text-sm font-semibold text-white bg-colorGreen px-4 py-2 rounded-full hover:bg-colorItera transition"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          </div>

          {/* Post 2 */}
          <div className="rounded-xl shadow-lg overflow-hidden bg-white">
            <img
              src={BlogImage}
              alt="Gambar Berita"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">8 Juli 2025 • Teknologi</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                <Link to="/berita/2" className="hover:text-red-600 transition">
                  Peluncuran Aplikasi Deteksi Produk Palsu
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                Tim mahasiswa berhasil merancang aplikasi mobile untuk mendeteksi produk palsu berbasis QR.
              </p>
              <Link
                to="/berita/2"
                className="inline-block text-sm font-semibold text-white bg-colorGreen px-4 py-2 rounded-full hover:bg-colorItera transition"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          </div>

          {/* Post 3 */}
          <div className="rounded-xl shadow-lg overflow-hidden bg-white">
            <img
              src={BlogImage}
              alt="Gambar Berita"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">5 Juli 2025 • Edukasi</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                <Link to="/berita/3" className="hover:text-red-600 transition">
                  Workshop Kekayaan Intelektual untuk Siswa
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                PKKI ITERA mengadakan pelatihan HAKI bagi siswa SMA untuk meningkatkan kesadaran hukum.
              </p>
              <Link
                to="/berita/3"
                className="inline-block text-sm font-semibold text-white bg-colorGreen px-4 py-2 rounded-full hover:bg-colorItera transition"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Contact />
      <Footer />
    </>
  );
};

export default Berita;

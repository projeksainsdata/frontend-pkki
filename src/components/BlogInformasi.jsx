import React from "react";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";

// Data dummy untuk sementara
const blogPosts = [
  {
    id: 1,
    title: "Panduan Pendaftaran Hak Cipta di ITERA",
    excerpt: "Pelajari langkah-langkah pendaftaran Hak Cipta melalui layanan PKKI ITERA dengan mudah dan cepat.",
    image: "/src/assets/images/liris.jpg",
    date: "04 Juli 2025",
    slug: "panduan-hak-cipta",
  },
  {
    id: 2,
    title: "Lomba Spesifikasi Paten ITERA 2025 Resmi Dibuka!",
    excerpt: "Segera daftarkan diri Anda dalam lomba spesifikasi paten untuk meningkatkan pemahaman dokumen paten.",
    image: "/src/assets/images/pkki1.jpg",
    date: "01 Juli 2025",
    slug: "lomba-spesifikasi-paten-2025",
  },
  {
    id: 3,
    title: "Mengenal Desain Industri & Cara Mendaftarkannya",
    excerpt: "Desain industri dilindungi hukum! Ketahui bagaimana prosedur pendaftarannya melalui sistem PKKI ITERA.",
    image: "/src/assets/images/pkki2.jpg",
    date: "28 Juni 2025",
    slug: "desain-industri-itera",
  },
];

const BlogInformasi = () => {
  return (
    <section className="bg-gradient-to-t from-[#121212] to-[#6963ac] to-[600%] py-20 px-6 md:px-20 font-spaceGrotesk">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Informasi & Berita</h2>
        <p className="text-gray-400 mt-2">Update terbaru seputar layanan HAKI di lingkungan kampus ITERA</p>
        <hr className="w-24 border border-colorGreen mt-4 mx-auto" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-[#121212] rounded-xl border border-white/10 hover:border-colorGreen transition overflow-hidden shadow-md hover:shadow-lg"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <p className="text-sm text-gray-400 mb-1">{post.date}</p>
              <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-gray-300 text-sm">{post.excerpt}</p>
              <Link
                to={`/berita/${post.slug}`}
                className="inline-flex items-center mt-4 text-colorGreen font-medium group"
              >
                Baca Selengkapnya <IconArrowRight className="ml-1 group-hover:translate-x-1 transition" size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/berita"
          className="inline-flex items-center px-6 py-3 bg-colorGreen text-white rounded-full hover:bg-colorItera transition"
        >
          Lihat Semua Berita
        </Link>
      </div>
    </section>
  );
};

export default BlogInformasi;

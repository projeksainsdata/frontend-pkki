import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { PUBLIC_PREFIX } from "../constants/apiPath"; // pastikan path ini sesuai struktur proyekmu

const BlogInformasi = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${PUBLIC_PREFIX.BLOG}?perPage=3&page=1&orderBy=createdAt`);
        const data = await response.json();
        setBlogs(data.data || []);
      } catch (err) {
        setError('Gagal memuat blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="bg-gradient-to-t from-[#121212] to-[#6963ac] to-[600%] py-20 px-6 md:px-20 font-spaceGrotesk">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Informasi & Berita</h2>
      </div>
      {loading ? (
        <p className="text-center text-gray-400">Memuat berita...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <div key={post.id} className="bg-[#121212] rounded-xl border border-white/10 overflow-hidden">
              <img src={post.thumbnail} alt={post.title} className="w-full h-52 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                <p className="text-gray-300 text-sm">
                  {post.description.split(" ").slice(0, 30).join(" ")}
                  {post.description.split(" ").length > 30 && "..."}
                </p>
                <Link to={`/berita/${post.slug}`} className="inline-flex items-center mt-4 text-colorGreen font-medium group">
                  Baca Selengkapnya <IconArrowRight className="ml-1 group-hover:translate-x-1 transition" size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-10">
        <Link to="/berita" className="inline-flex items-center px-6 py-3 bg-colorGreen text-white rounded-full hover:bg-colorItera transition">
          Lihat Semua Berita
        </Link>
      </div>
    </section>
  );
};

export default BlogInformasi;

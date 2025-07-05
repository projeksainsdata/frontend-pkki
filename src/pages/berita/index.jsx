import Navbar from "../../components/navbar/Navbar";
import BannerCustom from "../../components/HeroCustom";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconAlertCircle } from "@tabler/icons-react";
import dayjs from "dayjs";
import { PUBLIC_PREFIX } from "../../constants/apiPath";

const Berita = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${PUBLIC_PREFIX.BLOG}?perPage=6&orderBy=createdAt`);
        if (!response.ok) throw new Error("Gagal mengambil data berita");
        const data = await response.json();
        setBlogs(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <BannerCustom name="Berita Terkini" />

      <main className="mx-auto max-w-7xl px-6 py-20">
        {loading ? (
          <div className="text-center text-gray-500">Memuat berita...</div>
        ) : error ? (
          <div className="text-center text-red-500 flex items-center gap-2"><IconAlertCircle /> {error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <div key={i} className="rounded-xl shadow-lg overflow-hidden bg-white">
                <img
                  src={blog.thumbnail}
                  alt={`Gambar ${blog.title}`}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{dayjs(blog.updatedAt).format('D MMMM YYYY')} • {blog.categories.name}</p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    <Link to={`/berita/${blog.slug}`} className="hover:text-red-600 transition">
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.description.slice(0, 150)}...
                  </p>
                  <Link
                    to={`/berita/${blog.slug}`}
                    className="inline-block text-sm font-semibold text-white bg-colorGreen px-4 py-2 rounded-full hover:bg-colorItera transition"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Contact />
      <Footer />
    </>
  );
};

export default Berita;

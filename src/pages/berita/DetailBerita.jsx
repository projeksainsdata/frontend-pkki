import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconChevronRight, IconSearch } from '@tabler/icons-react';
import dayjs from 'dayjs';
import logo from '../../assets/images/logo-dark.svg';
import { PUBLIC_PREFIX } from '../../constants/apiPath';
import Navbar from '../../components/navbar/Navbar';
import BannerCustom from '../../components/HeroCustom';
import ConnectWithUs from '../../components/Contact';
import Footer from "../../components/Footer";

const DetailBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similiarArticle, setSimiliarArticle] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${PUBLIC_PREFIX.BLOG}/slug/${id}`);
        if (!res.ok) throw new Error('Gagal mengambil data blog');
        const result = await res.json();
        setBlog(result.data);

        const similiar = await fetch(`${PUBLIC_PREFIX.BLOG}?page=1&perPage=5&categoryName=${result.data.categories.name}`);
        const similiarRes = await similiar.json();
        setSimiliarArticle(similiarRes.data.filter(d => d.id !== result.data.id));
      } catch (err) {
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={logo} width={200} alt="Loading..." />
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <BannerCustom name="Detail Berita" />
      <div className="flex flex-col md:flex-row justify-between bg-slate-50 p-4 gap-4">
        <ul className="flex items-center gap-1 text-sm text-slate-600">
          <li><a href="/" className="underline">Beranda</a></li>
          <li><IconChevronRight size={18} /></li>
          <li><a href="/berita" className="underline">Berita</a></li>
          <li><IconChevronRight size={18} /></li>
          <li>{blog?.title?.slice(0, 30) + '...'}</li>
        </ul>
        <div className="relative w-full md:w-1/3">
          <input
            className="p-2 pl-4 border rounded-full w-full"
            placeholder="Cari berita lain..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute right-2 top-2"
            onClick={() => navigate(`/berita?cari=${searchQuery}`)}
          >
            <IconSearch />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-24 flex flex-col md:flex-row gap-8 py-10">
        {/* Konten utama */}
        <div className="w-full md:w-9/12 space-y-4">
          <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded text-xs">
            {blog?.categories?.name}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold">{blog?.title}</h1>
          <div className="text-sm text-gray-600">
            <p>Penulis: {blog?.user?.fullName}</p>
            <p>Diupdate: {dayjs(blog?.updatedAt).format('D MMMM YYYY')}</p>
          </div>
          <img src={blog?.thumbnail} alt="cover" className="rounded-md border w-full" />
          <div
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-3/12">
          {similiarArticle.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-3">Berita Terkait</h2>
              <div className="space-y-4">
                {similiarArticle.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                    onClick={() => navigate(`/berita/${item.slug}`)}
                  >
                    <img src={item.thumbnail} className="w-16 h-16 object-cover rounded-lg" alt={item.title} />
                    <div>
                      <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded text-xs">{item.categories.name}</span>
                      <p className="text-xs text-gray-500">{dayjs(item.updatedAt).format('D MMM YYYY')}</p>
                      <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <ConnectWithUs />
      <Footer />
    </>
  );
};

export default DetailBerita;

import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import './App.css';
import Informasi from './pages/Informasi';
import InfografisPage from './pages/Infografis';
import Berita from './pages/berita/index';
import GuidePage from './pages/Haki';
import Alur from './pages/Alur';
import LombaSpesifikasiPaten from './pages/Lomba';
import FaqPage from './pages/FaqPage';
import Layanan from './pages/Layanan';
import DaftarHaki from './pages/DaftarHaki';
import TentangKami from './pages/Committee';

// --- Auth ---
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundPage from './pages/404';

// --- Admin Pages ---
import AdminPage from './pages/admin';
import AdminBlog from './pages/admin/blog/blog';
import AdminBlogAdd from './pages/admin/blog/blogAdd';
import AdminBlogUpdate from './pages/admin/blog/[id]';
import AdminKategori from './pages/admin/kategori/kategori';
import AdminKategoriAdd from './pages/admin/kategori/kategoriAdd';
import AdminKategoriUpdate from './pages/admin/kategori/[id]';
import AdminUser from './pages/admin/users/user';
import AdminUserAdd from './pages/admin/users/userAdd';
import AdminUserUpdate from './pages/admin/users/[id]';

// --- Protected Routes ---
import {
  ProtectedRoute,
  SuperAdminRoute,
} from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import DetailBerita from './pages/berita/DetailBerita';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/berita' element={<Berita />} />
          <Route path='/berita/:id' element={<DetailBerita />} />
          <Route path='/panduan' element={<GuidePage />} />
          <Route path='/alur' element={<Alur />} />
          <Route path='/lomba' element={<LombaSpesifikasiPaten />} />
          <Route path='/infografis' element={<InfografisPage />} />
          <Route path='/faqs' element={<FaqPage />} />
          <Route path='/layanan' element={<Layanan />} />
          <Route path='/tentang-kami' element={<TentangKami />} />
          

          {/* --- Auth Routes --- */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* --- Protected Admin Routes --- */}
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/blog'
            element={
              <ProtectedRoute>
                <AdminBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/blog/add'
            element={
              <ProtectedRoute>
                <AdminBlogAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/blog/edit/:id'
            element={
              <ProtectedRoute>
                <AdminBlogUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/kategori'
            element={
              <ProtectedRoute>
                <AdminKategori />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/categories/add'
            element={
              <ProtectedRoute>
                <AdminKategoriAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/kategori/:id'
            element={
              <ProtectedRoute>
                <AdminKategoriUpdate />
              </ProtectedRoute>
            }
          />
          {/* --- SuperAdmin Only --- */}
          <Route
            path='/admin/users'
            element={
              <SuperAdminRoute>
                <AdminUser />
              </SuperAdminRoute>
            }
          />
          <Route
            path='/admin/user/add'
            element={
              <SuperAdminRoute>
                <AdminUserAdd />
              </SuperAdminRoute>
            }
          />
          <Route
            path='/admin/user/:id'
            element={
              <SuperAdminRoute>
                <AdminUserUpdate />
              </SuperAdminRoute>
            }
          />
          {/* --- Not Found Route --- */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </Router>
    </>
  );
}

export default App;

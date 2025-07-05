import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ApiLogin from '../constants/api';
import { AUTH_PATH } from '../constants/apiPath';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from '../assets/images/hero2-01.png';
import logo from '../assets/images/logo-dark.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      toast.info('Anda sudah login...');
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await ApiLogin.post(AUTH_PATH.LOGIN, { email, password });
      const accessToken = response.data?.data?.accessToken;
      
      if (!accessToken) {
        throw new Error('Access token tidak ditemukan dalam respons');
      }

      localStorage.setItem('token', accessToken);
      
      if (response.data?.data?.refreshToken) {
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
      }

      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        // Display success alert with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Login berhasil!',
          text: 'Anda berhasil masuk ke sistem.',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/');
        });
      } else {
        throw new Error('Gagal menyimpan token di localStorage');
      }

    } catch (err) {
      console.error("Login gagal:", {
        error: err,
        message: err.message,
        response: err.response?.data
      });

      let errorMessage;
      if (err.response && err.response.status === 422) {
        errorMessage = "Email atau password salah. Silakan coba lagi.";
      } else {
        errorMessage = "Terjadi kesalahan. Silakan coba lagi nanti.";
      }
      
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="bg-cover bg-center h-48">
          <img src={image} alt="image header" className="w-full h-full object-cover" />
        </div>

        <div className="p-8">
          <div className="flex justify-start">
            <img src={logo} alt="Farmasi Logo" className="mb-4" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Masuk Sistem PKKI</h2>
          <p className="text-gray-500 mb-6">Masukkan Email dan Password anda yang sudah terdaftar</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-colorGreen text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Masuk
              </button>
            </div>
          </form>

          <div className="text-right text-gray-500 mt-4">
            <Link to={'/forgot-password'} className="text-colorGreen underline">Lupa Password?</Link>
          </div>
          {/* <p className="text-center text-gray-500 mt-6">
            Sudah punya Akun? <Link to = {'/login'} className='text-green-600'>Login</Link>
          </p> */}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
}
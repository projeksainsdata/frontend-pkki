import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ApiLogin from '../constants/api';
import { AUTH_PATH } from '../constants/apiPath';

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    fullName: '',
    email: '',
    jobTitle: '',
    role: 'USER',
    password: '',
    confirmPassword: '',
    loading: false,
    fieldErrors: {},
    error: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { fullName, email, jobTitle, password, confirmPassword } = state;
    const errors = {};
    if (!fullName) errors.fullName = 'Nama lengkap wajib diisi';
    if (!email) errors.email = 'Email wajib diisi';
    if (!jobTitle) errors.jobTitle = 'Jabatan wajib diisi';
    if (!password) errors.password = 'Password wajib diisi';
    if (password !== confirmPassword) errors.confirmPassword = 'Password tidak cocok';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState(prev => ({ ...prev, loading: true, error: '' }));

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setState(prev => ({ ...prev, fieldErrors: errors, loading: false }));
      return;
    }

    const { fullName, email, jobTitle, role, password } = state;

    const now = new Date().toISOString();
    const userData = {
      fullName,
      email,
      jobTitle,
      role,
      password,
      passwordCreated: now,
      passwordExpired: now, // atau bisa ditambahkan masa berlaku seperti +3 bulan
      signUpDate: now
    };

    try {
      const res = await axios.post(AUTH_PATH.REGISTER, userData);
      toast.success('Registrasi berhasil!');
      await handleLogin(email, password);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      setState(prev => ({ ...prev, error: 'Gagal registrasi. Coba lagi.' }));
      toast.error('Registrasi gagal.');
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await ApiLogin.post(AUTH_PATH.LOGIN, { email, password });
      const token = res.data?.data?.access;
      if (token) {
        localStorage.setItem('token', token);
        if (res.data?.data?.refresh) {
          localStorage.setItem('refreshToken', res.data.data.refresh);
        }
      } else {
        throw new Error('Token tidak ditemukan');
      }
    } catch (err) {
      console.error('Login gagal:', err);
      throw new Error('Login gagal setelah registrasi.');
    }
  };

  const { fullName, email, jobTitle, password, confirmPassword, fieldErrors, error } = state;

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        <input name="fullName" value={fullName} onChange={handleChange} placeholder="Nama Lengkap" className="w-full mb-2 p-2 border rounded" />
        {fieldErrors.fullName && <p className="text-red-500">{fieldErrors.fullName}</p>}

        <input name="email" type="email" value={email} onChange={handleChange} placeholder="Email" className="w-full mb-2 p-2 border rounded" />
        {fieldErrors.email && <p className="text-red-500">{fieldErrors.email}</p>}

        <input name="jobTitle" value={jobTitle} onChange={handleChange} placeholder="Jabatan" className="w-full mb-2 p-2 border rounded" />
        {fieldErrors.jobTitle && <p className="text-red-500">{fieldErrors.jobTitle}</p>}

        <input name="password" type="password" value={password} onChange={handleChange} placeholder="Password" className="w-full mb-2 p-2 border rounded" />
        {fieldErrors.password && <p className="text-red-500">{fieldErrors.password}</p>}

        <input name="confirmPassword" type="password" value={confirmPassword} onChange={handleChange} placeholder="Konfirmasi Password" className="w-full mb-2 p-2 border rounded" />
        {fieldErrors.confirmPassword && <p className="text-red-500">{fieldErrors.confirmPassword}</p>}

        <button type="submit" disabled={state.loading} className="w-full bg-blue-500 text-white p-2 rounded mt-4">
          {state.loading ? 'Mendaftarkan...' : 'Register'}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;

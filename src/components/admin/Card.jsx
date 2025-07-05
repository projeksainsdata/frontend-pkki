import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CardAdmin = () => {
  const [stats, setStats] = useState({ users: 0, blogs: [], categories: [], repositories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: { Authorization: `Bearer ${token}` },
    });

    const fetchStats = async () => {
      try {

        //cek apakah author, kalau author fetch blogs sama category aja
        const [users, blogs, categories, repositories] = await Promise.all([
          axiosInstance.get('/api/v1/admin/users'),
          axiosInstance.get('/api/v1/admin/blogs'),
          axiosInstance.get('/api/v1/admin/categories'),
          axiosInstance.get('/api/v1/admin/repositories'),
        ]);

        setStats({
          users: users.data?.data?.length || 0,
          blogs: blogs.data?.data || [],
          categories: categories.data?.data || [],
          repositories: repositories.data?.data || [],
        });
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setError(err.message);
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  const categoryTypeData = {
    labels: ['BLOG', 'REPOSITORI'],
    datasets: [{
      data: [...new Set(stats.categories.map(cat => cat.type))].map(type => 
        stats.categories.filter(cat => cat.type === type).length
      ),
      backgroundColor: [...new Set(stats.categories.map(cat => cat.type))].map(() => 
        `hsl(${Math.random() * 360}, 70%, 50%)`
      ),
    }],
  };

  const distributionData = {
    labels: ['Artikel', 'Repositori Obat'],
    datasets: [{
      label: 'Distribution',
      data: [stats.blogs.length, stats.repositories.length],
      backgroundColor: ['orange', 'teal'],
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribusi Konten'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  // if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-400 rounded-lg">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">User</h3>
              <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stats.users}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-400 rounded-lg">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Blog</h3>
              <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stats.blogs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-red-400 rounded-lg">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Repositori Obat</h3>
              <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stats.repositories.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-400 rounded-lg">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Kategori</h3>
              <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stats.categories.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Distribusi Tipe Kategori</h2>
          <div className="w-full h-fit">
            {!loading && <Pie data={categoryTypeData} options={chartOptions} />}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Distribusi Konten</h2>
          <div className="w-full h-64">
            {!loading && <Bar data={distributionData} options={barOptions} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAdmin;
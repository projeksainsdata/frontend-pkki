import { useState, useEffect } from 'react';
import {
  IconHome,
  IconEdit,
  IconChevronLeft,
  IconChevronRight,
  IconFileText,
  IconLogout,
  IconChartArcs,
} from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const decodedToken = jwt_decode.jwtDecode(token);
        if (decodedToken?.data?.roles?.name) {
          setUserRole(decodedToken.data.roles.name);
        } else {
          console.error('Invalid token structure:', decodedToken);
          handleLogout();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  const getMenuItems = () => {
    if (!userRole) return [];

    const allMenuItems = [
      { path: '/', icon: <IconHome className="w-6 h-6" />, label: 'Beranda', roles: ['author', 'superadmin'] },
      { path: '/admin', icon: <IconChartArcs className="w-6 h-6" />, label: 'Dashboard', roles: ['author', 'superadmin'] },
      { path: '/admin/blog', icon: <IconEdit className="w-6 h-6" />, label: 'Blog', roles: ['author', 'superadmin'] },
      { path: '/admin/kategori', icon: <IconFileText className="w-6 h-6" />, label: 'Kategori', roles: ['author', 'superadmin'] },
      { path: '/admin/users', icon: <IconFileText className="w-6 h-6" />, label: 'User', roles: ['superadmin'] },
    ];

    return allMenuItems.filter(item => item.roles.includes(userRole));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout berhasil!');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {isOpen && isMobile && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
        />
      )}

      <div
        className={`fixed lg:static bg-colorGreen text-white h-screen transition-all duration-300 ease-in-out z-30 ${
          isOpen ? 'w-64' : 'w-20'
        } ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-300 p-1"
          >
            {isOpen ? <IconChevronLeft className="w-6 h-6" /> : <IconChevronRight className="w-6 h-6" />}
          </button>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {getMenuItems().map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="text-gray-300">{item.icon}</span>
                  {isOpen && (
                    <span className="text-gray-300 font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-8 left-0 right-0 mx-4 flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          <IconLogout className="w-6 h-6 text-red-500" />
          {isOpen && <span className="text-red-500 font-medium">Logout</span>}
        </button>
      </div>

      <div className="flex-1 lg:ml-0 bg-gray-100 overflow-auto">
        <div className="m-2 rounded-sm">{children}</div>
      </div>

      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 z-40 transition-colors duration-200"
        >
          {isOpen ? (
            <IconChevronLeft className="w-6 h-6 text-white" />
          ) : (
            <IconChevronRight className="w-6 h-6 text-white" />
          )}
        </button>
      )}
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;

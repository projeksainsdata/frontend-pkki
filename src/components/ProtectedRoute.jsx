import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// import Sidebar from '../components/admin/sidebar';

// Helper functions
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const hasAccess = (requiredRoles, userRole) => {
  if (!requiredRoles) return true;
  return requiredRoles.includes(userRole);
};

const handleLogout = (navigate) => {
  localStorage.removeItem('token');
  navigate('/');
};

// Protected Route Component
export const ProtectedRoute = ({ roles, children }) => {
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
        const decodedToken = jwtDecode(token);
        
        if (decodedToken?.data?.roles?.name) {
          setUserRole(decodedToken.data.roles.name);
        } else {
          console.error('Invalid token structure:', decodedToken);
          handleLogout(navigate);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        handleLogout(navigate);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  if (roles && !hasAccess(roles, userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      {children || <Outlet />}
    </>
  );
};

ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node
};

// Role-specific routes
export const SuperAdminRoute = ({ children }) => (
  <ProtectedRoute roles={['superadmin']}>
    {children}
  </ProtectedRoute>
);

SuperAdminRoute.propTypes = {
  children: PropTypes.node
};

export const AuthorRoute = ({ children }) => (
  <ProtectedRoute roles={['author']}>
    {children}
  </ProtectedRoute>
);

AuthorRoute.propTypes = {
  children: PropTypes.node
};

export default ProtectedRoute;
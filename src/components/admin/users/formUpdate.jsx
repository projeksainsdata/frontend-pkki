import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { USER_PREFIX,ROLE_PREFIX } from '../../../constants/apiPath';

const CategoryType = {
  BLOGS: 'BLOGS',
  REPOSITORIES: 'REPOSITORIES'
};
const getRole = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${ROLE_PREFIX.INDEX}?perPage=20&page=1&orderBy=createdAt&isActive=true&accessFor=SUPER_ADMIN%2CUSER%2CAUTHOR`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-custom-lang': 'en',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
  }
};
const FormUsers = () => {
  const [roles, setRoles] = useState(null)

  useEffect(() => {
    getRole().then(roles => {
      setRoles(roles.data)
    })
  }, [])
  const navigate = useNavigate();
  const { id } = useParams();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    jobTitle: '',
    role: ''
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchCategoryDetails = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await axios.get(`${USER_PREFIX.INDEX}/${id}`);
      const categoryData = response.data.data || response.data;

      // setFormData({
      //   name: categoryData.name || '',
      //   description: categoryData.description || '',
      //   type: categoryData.type || CategoryType.BLOGS
      // });
      setFormData({
        fullName: categoryData.fullName || '',
        email: categoryData.email || '',
        password: categoryData.password || null,
        jobTitle: categoryData.jobTitle || '',
        role: categoryData.role || '',
      });
    } catch (error) {
      console.error('Error fetching category details:', error);

      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      toast.error('Failed to fetch category details');
      navigate('/categories');
    } finally {
      setLoading(false);
    }
  }, [id, isAuthenticated, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to access this page');
      navigate('/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsAuthenticated(true);
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategoryDetails();
    }
  }, [isAuthenticated, fetchCategoryDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    const trimmedName = formData.name;
    const trimmedDescription = formData.description;

    if (!trimmedName) {
      errors.name = 'Name is required';
    } else if (trimmedName.length < 3 || trimmedName.length > 50) {
      errors.name = 'Name must be between 3 and 50 characters';
    }

    if (!trimmedDescription) {
      errors.description = 'Description is required';
    } else if (trimmedDescription.length < 10 || trimmedDescription.length > 500) {
      errors.description = 'Description must be between 10 and 500 characters';
    }

    if (!Object.values(CategoryType).includes(formData.type)) {
      errors.type = 'Invalid category type';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to update category');
      navigate('/login');
      return;
    }

    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   Object.values(validationErrors).forEach(error => {
    //     toast.error(error);
    //   });
    //   return;
    // }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        jobTitle: formData.jobTitle,
        role: formData.role
      };

      await axios.put(
        `${USER_PREFIX.INDEX}/${id}`, 
        payload
      );
      toast.success('User Berhasil Diubah');
      navigate('/admin/users');
    } catch (error) {
      console.error('Update error:', error);

      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Failed to update category');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading category details...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen from-blue-50">
      <div className="w-full max-w-lg p-8 bg-white">
        <h1 className="text-2xl font-semibold text-left text-gray-800 mb-6">
          Edit Akun Pengguna
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
              placeholder="Enter category name"
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
              placeholder="Enter category email"
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubah Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={3}
              maxLength={50}
              placeholder="Enter password"
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
              placeholder="Enter category jobTitle"
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
            >
              {roles && roles.map((type) => (
                <option value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormUsers;
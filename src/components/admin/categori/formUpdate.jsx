import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CATEGORY_PREFIX } from '../../../constants/apiPath';

const CategoryType = {
  BLOGS: 'BLOGS',
  REPOSITORIES: 'REPOSITORIES'
};

const FormCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: CategoryType.BLOGS
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchCategoryDetails = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await axios.get(`${CATEGORY_PREFIX.INDEX}/${id}`);
      const categoryData = response.data.data || response.data;

      setFormData({
        name: categoryData.name || '',
        description: categoryData.description || '',
        type: categoryData.type || CategoryType.BLOGS
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

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach(error => {
        toast.error(error);
      });
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const payload = {
        name: formData.name,
        description: formData.description,
        type: formData.type
      };

      await axios.put(
        `${CATEGORY_PREFIX.INDEX}/${id}`, 
        payload
      );
      toast.success('Kategori Berhasil Diubah');
      navigate('/admin/kategori');
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
    <div className="max-w-lg mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold text-left mb-6">Ubah Kategori</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
              placeholder="Enter category name"
              disabled={isSubmitting}
            />
          </label>
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={500}
              rows={4}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
              placeholder="Enter category description"
              disabled={isSubmitting}
            />
          </label>
        </div>

        {/* Type Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Type
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-white border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
              disabled={isSubmitting}
            >
              {Object.values(CategoryType).map(type => (
                <option key={type} value={type}>
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Updating...' : 'Submit'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/kategori')}
          className="w-full mt-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default FormCategory;
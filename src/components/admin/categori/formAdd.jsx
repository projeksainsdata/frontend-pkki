import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import usePostData from '../../../hooks/usePostData';
import { CATEGORY_PREFIX } from '../../../constants/apiPath';

const CategoryType = {
  BLOGS: 'BLOGS',
  REPOSITORIES: 'REPOSITORIES'
};

const AddCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: CategoryType.BLOGS
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { postData } = usePostData(CATEGORY_PREFIX.CREATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
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
    if (isSubmitting) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach(error => {
        toast.error(error);
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: formData.name,
        description: formData.description,
        type: formData.type
      };

      await postData(payload);
      toast.success('Kategori Berhasil ditambahkan');
      navigate('/admin/kategori');
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error(err.message || 'Failed to add category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen from-blue-50">
      <div className="w-full max-w-lg p-8 bg-white">
        <h1 className="text-2xl font-semibold text-left text-gray-800 mb-6">
          Tambah Kategori
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
              Deskripsi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={500}
              rows={4}
              placeholder="Enter kategori deskripsi minimal 10 karakter"
              disabled={isSubmitting}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
            >
              {Object.values(CategoryType).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0) + type.slice(1).toLowerCase()}
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

export default AddCategory;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import usePostData from '../../../hooks/usePostData';
import { USER_PREFIX, ROLE_PREFIX } from '../../../constants/apiPath';

const RoleType = {
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
}
const AddUsers = () => {

  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    jobTitle: '',
    role:''
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { postData } = usePostData(USER_PREFIX.CREATE);


  useEffect(() => {
    setLoading(true)
    getRole().then(roles => {
      setRoles(roles.data)
      setFormData({ ...formData, role: roles.data[0].id })
      setLoading(false)
    })
  }, [])

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

    if (!Object.values(RoleType).includes(formData.type)) {
      errors.type = 'Invalid category type';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   Object.values(validationErrors).forEach(error => {
    //     toast.error(error);
    //   });
    //   return;
    // }

    try {
      setIsSubmitting(true);

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        jobTitle: formData.jobTitle,
        role: formData.role
      };

      console.log(formData)
      await postData(payload);
      toast.success('Kategori Berhasil ditambahkan');
      navigate('/admin/users');
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error(err.message || 'Failed to add category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>{!loading && (<div className="flex justify-center items-center min-h-screen from-blue-50">
      <div className="w-full max-w-lg p-8 bg-white">
        <h1 className="text-2xl font-semibold text-left text-gray-800 mb-6">
          Tambah Akun Pengguna
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
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
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
    </div>)}</>
  );
};

export default AddUsers;
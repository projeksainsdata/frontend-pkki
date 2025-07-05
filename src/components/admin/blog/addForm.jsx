import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const FormAddBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id) && id !== 'undefined';
  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${BASE_URL}/api/v1/admin/blogs`;
  const CATEGORIES_API_URL = `${BASE_URL}/api/v1/admin/categories`;
  const UPLOAD_URL = `${BASE_URL}/api/v1/public/aws/s3/upload`;
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    content: '',
    status: 'DRAFT',
    category: ''
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`
    };
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload an image file (JPEG, PNG, or GIF)');
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('File size should be less than 5MB');
        return;
      }

      try {
        // Get the current cursor position
        const range = quillRef.current.getSelection(true);

        // Insert temporary loading placeholder
        quillRef.current.insertEmbed(
          range.index,
          'image',
          '/images/placeholder-loading.gif'
        );

        // Move cursor to right side of image
        quillRef.current.setSelection(range.index + 1);

        // Prepare form data for upload
        const formData = new FormData();
        formData.append('file', file);

        // Upload to AWS S3
        const response = await axios.post(
          UPLOAD_URL,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              ...getAuthHeader()
            },
          }
        );

        // Remove the placeholder image
        quillRef.current.deleteText(range.index, 1);

        if (response.data && response.data.data) {
          // Insert the uploaded image URL
          quillRef.current.insertEmbed(
            range.index,
            'image',
            response.data.data.completedUrl
          );

          // Move cursor after image
          quillRef.current.setSelection(range.index + 1);

          toast.success('Image uploaded successfully');
        }
      } catch (error) {
        console.error('Image upload error:', error);
        // Remove the placeholder if upload failed
        const range = quillRef.current.getSelection();
        if (range) {
          quillRef.current.deleteText(range.index - 1, 1);
        }
        toast.error('Failed to upload image');
      }
    };
  }, [UPLOAD_URL]);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'script', 'indent',
    'link', 'image', 'color', 'background',
    'font', 'align'
  ];

  const initializeQuill = (el) => {
    if (el && !quillRef.current) {
      quillRef.current = el.getEditor();
    }
  };

  const handleThumbnailUpload = async (file) => {
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload an image file (JPEG, PNG, or GIF)');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        UPLOAD_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...getAuthHeader()
          },
        }
      );

      if (response.data && response.data.data) {
        setFormData(prev => ({
          ...prev,
          thumbnail: response.data.data.completedUrl
        }));
        toast.success('Thumbnail uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get(CATEGORIES_API_URL, {
          headers: getAuthHeader()
        });
        const blogCategories = (categoriesResponse.data.data || []).filter(
          category => category.type === 'BLOGS'
        );
        setCategories(blogCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        if (error.response?.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: 'Please login again.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error loading categories',
          });
        }
      }
    };

    fetchCategories();
  }, [CATEGORIES_API_URL]);

  useEffect(() => {
    const fetchBlog = async () => {
      if (isEditMode && id) {
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}/${id}`, {
            headers: getAuthHeader()
          });

          if (response.data.data) {
            setFormData(response.data.data);
            if (response.data.data.thumbnail) {
              setPreviewImage(response.data.data.thumbnail);
            }
          }
        } catch (error) {
          console.error('Fetch error:', error);
          const errorMessage = error.response?.data?.message || error.message;

          if (error.response?.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Authentication Error',
              text: 'Please login again.',
            });
          } else if (error.response?.status === 404 || error.response?.status === 500) {
            navigate('/admin/blog');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Error fetching blog: ${errorMessage}`,
            });
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBlog();
  }, [id, isEditMode, navigate, API_URL]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail' && files && files[0]) {
      handleThumbnailUpload(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Title and content are required',
      });
      return;
    }

    if (!formData.thumbnail) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please upload a thumbnail image',
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const headers = {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      };

      if (isEditMode && id) {
        await axios.put(`${API_URL}/${id}`, formData, { headers });
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Blog updated successfully',
        });
      } else {
        await axios.post(API_URL, formData, { headers });
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Blog created successfully',
        });
      }
      navigate('/admin/blog');
    } catch (error) {
      console.error('Submit error:', error);
      if (error.response?.status === 401) {
        await Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Please login again.',
        });
        navigate('/login');
      } else {
        const errorMessage = error.response?.data?.message || error.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error ${isEditMode ? 'updating' : 'creating'} blog: ${errorMessage}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-10">
        {isEditMode ? 'Edit Blog' : 'Tambah Blog'}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail
          </label>
          <div className="space-y-2">
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleChange}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {isUploading && (
              <div className="text-sm text-gray-500">Uploading image...</div>
            )}
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Thumbnail preview"
                  className="max-w-xs h-auto rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={loading || isUploading}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 bg-white border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading || isUploading}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            disabled={loading || isUploading}
          />
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm font-medium mb-1">Content</label>
          <ReactQuill
            ref={initializeQuill}
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            placeholder="Ketikkan Artikel Anda disini"
            className={`h-fit mb-5 ${(loading || isUploading) ? 'opacity-50 pointer-events-none' : ''}`}
            resize
            style={{ height: '300px' }}
          />
          <button
            type="submit"
            className={`w-full mt-20 py-2 px-4 rounded-md text-white ${(loading || isUploading)
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              }`}
            disabled={loading || isUploading}
          >
            {loading || isUploading ? 'Loading...' : isEditMode ? 'Update Blog' : 'Create Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddBlog;
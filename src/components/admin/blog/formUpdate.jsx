import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';

const FormUpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id) && id !== 'undefined';
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    content: '',
    status: 'DRAFT',
    category: ''
  });

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const API_URL = useMemo(() => `${import.meta.env.VITE_API_URL}/api/v1/admin/blogs`, []);
  const CATEGORIES_API_URL = useMemo(() => `${import.meta.env.VITE_API_URL}/api/v1/admin/categories`, []);
  const UPLOAD_URL = useMemo(() => `${import.meta.env.VITE_API_URL}/api/v1/public/aws/s3/upload`, []);

  const getAuthHeader = () => {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`
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

  // Memoize Quill editor configuration
  const modules = useMemo(() => ({
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
  }), [imageHandler]);

  const formats = useMemo(() => [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'script',
    'indent',
    'link', 'image',
    'color', 'background',
    'font',
    'align'
  ], []);

  const initializeQuill = (el) => {
    if (el && !quillRef.current) {
      quillRef.current = el.getEditor();
    }
  };

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(CATEGORIES_API_URL, {
          headers: getAuthHeader()
        });
        const blogCategories = response.data.data.filter(
          category => category.type === 'BLOGS'
        );
        setCategoryList(blogCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        if (error.response?.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: 'Please login again.',
          });
        }
      }
    };

    fetchCategories();
  }, [CATEGORIES_API_URL]);

  // Fetch blog data 
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
            setPreviewImage(response.data.data.thumbnail);
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

  // Handle file upload
  const handleFileUpload = async (file) => {
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

    setIsUploading(true);

    try {
      // Create preview URL
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        UPLOAD_URL,
        formData,
        {
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data && response.data.data) {
        setFormData(prev => ({
          ...prev,
          thumbnail: response.data.data.completedUrl
        }));
        setPreviewImage(response.data.data.completedUrl);
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail' && files && files[0]) {
      handleFileUpload(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle Quill editor content changes
  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.title || !formData.content) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Title and content are required',
      });
      return;
    }
    // Validate thumbnail
    if (!formData.thumbnail) {
      Swal.fire({
        icon: 'warning',
        title: 'Thumbnail Required',
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
      // Create payload with only necessary fields
      const payload = {
        title: formData.title,
        description: formData.description,
        thumbnail: formData.thumbnail,
        content: formData.content,
        status: formData.status,
        category: formData.category
      };
      if (isEditMode && id) {
        // Update existing blog
        await axios.put(`${API_URL}/${id}`, payload, { headers });
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Blog updated successfully',
        });
      } else {
        // Create new blog
        await axios.post(API_URL, payload, { headers });
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
      } else if (error.response?.status === 403) {
        await Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'Anda bukan admin maka tidak bisa mengedit blog ini.',
        });
        navigate('/admin/blog'); 
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
        {/* Thumbnail Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="thumbnail">
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
              disabled={loading || isUploading}
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

        {/* Title Input */}
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
        {/* Category Select */}
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
            disabled={loading}
            required
          >
            <option value="">Select a category</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* Description Textarea */}
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
            disabled={loading}
          />
        </div>
        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <ReactQuill 
            ref={initializeQuill}
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            placeholder="Enter content"
            className={`h-full ${loading ? 'opacity-50 pointer-events-none' : ''}`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading || isUploading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
          disabled={loading || isUploading}
        >
          {loading ? 'Loading...' : isEditMode ? 'Update Blog' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default FormUpdateBlog;
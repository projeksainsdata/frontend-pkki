import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { BLOGS_PREFIX } from '../../../constants/apiPath';
import { toast } from 'react-toastify';

const TableBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
    totalPage: 0,
  });

  const navigate = useNavigate();

  const statusOptions = [
    { value: 'DRAFT', label: 'Draft' },
    { value: 'PUBLISHED', label: 'Published' },
    { value: 'ARCHIVED', label: 'Archived' }
  ];

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`
    };
  };

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);

  const fetchBlogs = useCallback(async (page = 1, search = '', perPage = pagination.perPage) => {
    try {
      setLoading(true);
      setError(null);

      const url = new URL(BLOGS_PREFIX.INDEX);
      url.searchParams.append('page', page);
      url.searchParams.append('perPage', perPage);
      
      if (search) {
        url.searchParams.append('search', search);
      }

      const statusParam = selectedStatuses.length > 0 
        ? `&status=${encodeURIComponent(selectedStatuses.join(','))}` 
        : '';

      const response = await fetch(
        `${url.toString()}${statusParam}&include=category,user`,
        {
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const responseData = await response.json();
      
      const transformedData = responseData.data.map(blog => ({
        ...blog,
        category: {
          id: blog.category,
          name: blog.category || 'Uncategorized'
        },
        user: {
          id: blog?.fullName,
          fullName: blog.user?.fullName || 'Unknown User'
        }
      }));

      setBlogs(transformedData);

      if (responseData._metadata && responseData._metadata.pagination) {
        setPagination({
          page: responseData._metadata.pagination.page,
          perPage: responseData._metadata.pagination.perPage,
          total: responseData._metadata.pagination.total,
          totalPage: responseData._metadata.pagination.totalPage,
        });
      }
    } catch (err) {
      setError('Error fetching blogs');
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch blogs'
      });
    } finally {
      setLoading(false);
    }
  }, [pagination.perPage, selectedStatuses, navigate]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearch = (search) => {
    setSearchTerm(search);

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      fetchBlogs(1, search);
    }, 500);
  };

  const handleStatusChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedStatuses(value);
    fetchBlogs(1, searchTerm);
  };

  const handlePageChange = (page) => {
    fetchBlogs(page, searchTerm, pagination.perPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPagination((prev) => ({ ...prev, perPage: newPerPage }));
    fetchBlogs(1, searchTerm, newPerPage);
  };

  const handleEdit = (id) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${BLOGS_PREFIX.INDEX}/${id}`, {
            method: 'DELETE',
            headers: {
              ...getAuthHeader(),
              'Content-Type': 'application/json'
            }
          });

          if (response.status === 401) {
            navigate('/login');
            return;
          }

          if (!response.ok) {
            throw new Error('Failed to delete blog');
          }

          Swal.fire(
            'Deleted!',
            'Your blog has been deleted.',
            'success'
          );

          fetchBlogs(pagination.page, searchTerm, pagination.perPage);
        } catch (error) {
          console.error('Error deleting blog:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete blog'
          });
        }
      }
    });
  };

  const handleStatusUpdate = async () => {
    if (!selectedBlog || !newStatus) return;
  
    try {
      const response = await fetch(`${BLOGS_PREFIX.INDEX}/${selectedBlog.id}`, {
        method: 'PUT',
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        })
      });
  
      if (response.status === 401) {
        navigate('/login');
        return;
      }
  
      if (!response.ok) {
        throw new Error('Failed to update blog status');
      }
  
      toast.success('Status Blog Berhasil di Update');

      fetchBlogs(pagination.page, searchTerm, pagination.perPage);
      setIsStatusModalOpen(false);
      setSelectedBlog(null);
      setNewStatus('');
    } catch (error) {
      console.error('Error updating blog status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengubah Status',
        text: 'Gagal mengubah status karena anda bukan admin'
      });
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      DRAFT: 'bg-yellow-100 text-yellow-800',
      PUBLISHED: 'bg-green-100 text-green-800',
      ARCHIVED: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const columns = [
    {
      name: 'No',
      selector: (row, index) =>
        (pagination.page - 1) * pagination.perPage + index + 1,
      sortable: true,
      width: '70px',
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      width: '200px',
    },
    {
      name: 'Thumbnail',
      cell: row => (
        row.thumbnail ? (
          <img
            src={row.thumbnail}
            alt={row.title}
            className="h-20 w-20 rounded object-cover"
          />
        ) : (
          <div className="h-20 w-20 bg-gray-200 rounded flex items-center justify-center">
            No Image
          </div>
        )
      ),
      width: '100px',
    },
    {
      name: 'Description',
      selector: row => row.description,
      width: '200px',
      cell: row => (
        <div className="truncate max-w-xs">{row.description}</div>
      ),
    },
    {
      name: 'Category',
      selector: row => row.categories?.name,
      sortable: true,
      width: '150px',
      cell: row => (
        <span>
          {row.categories?.name || 'Uncategorized'}
        </span>
      ),
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`px-1 py-1 font-bold rounded-md text-sm ${getStatusBadgeColor(row.status)}`}>
          {row.status}
        </span>
      ),
      width: '120px',
    },
    {
      name: 'Created At',
      selector: row => row.createdAt,
      sortable: true,
      cell: row => new Date(row.createdAt).toLocaleDateString(),
      width: '150px',
    },
    {
      name: 'Author',
      selector: row => row.user?.fullName,
      sortable: true,
      width: '150px',
      cell: row => (
        <span>
          {row.user?.fullName || 'Unknown User'}
        </span>
      ),
    },
    {
      name: 'Aksi',
      cell: row => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          >
            Hapus
          </button>
          <button
            onClick={() => {
              setSelectedBlog(row);
              setNewStatus(row.status);
              setIsStatusModalOpen(true);
            }}
            className="px-3 py-1 bg-blue-900 text-white rounded hover:bg-blue-800 focus:outline-none"
          >
            Update Status
          </button>
        </div>
      ),
      width: '280px',
    },
  ];

  return (
    <div className="px-1">
      <h1 className="text-2xl font-bold mb-6 mt-10">Manajemen Blog</h1>
      
      <div className="md:flex justify-between items-center mb-4">
        <div className="md:w-1/2 w-full md:mb-2">
          <input
            type="text"
            placeholder="Cari blog..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="w-full md:w-[450px] mb-2 md:ml-3">
          <select
            value={selectedStatuses}
            onChange={handleStatusChange}
            className="w-full md:w-1/3 px-4 py-2 border bg-white border-gray-300 rounded-lg">
            <option value="">All Status</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => navigate('/admin/blog/add')}
          className="w-full md:w-1/3 px-4 py-2 mt-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Tambah Blog
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <DataTable
        columns={columns}
        data={blogs}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={pagination.total}
        paginationDefaultPage={pagination.page}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerPageChange}
        highlightOnHover
        noHeader
        noDataComponent={
          !loading && !blogs.length ? (
            <div className="text-center py-4">Tidak ada blog ditemukan</div>
          ) : null
        }
        customStyles={{
          headRow: {
            style: {
              backgroundColor: '#1E3A8A', 
              color: 'white',
            },
          },
          headCells: {
            style: {
              fontWeight: 'bold',
            },
          },
        }}
      />

      {/* Status Update Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Update Status Blog</h2>
              <button
                onClick={() => {
                  setIsStatusModalOpen(false);
                  setSelectedBlog(null);
                  setNewStatus('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {statusOptions.map((status) => (
                <label
                  key={status.value}
                  className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={newStatus === status.value}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{status.label}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => {
                  setIsStatusModalOpen(false);
                  setSelectedBlog(null);
                  setNewStatus('');
                }}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableBlog;
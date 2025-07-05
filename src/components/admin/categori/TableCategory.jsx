import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { CATEGORY_PREFIX } from '../../../constants/apiPath';
import Swal from 'sweetalert2';

const TableCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
    totalPage: 0,
  });

  const navigate = useNavigate();

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

  const fetchCategories = useCallback(async (page = 1, perPage = pagination.perPage) => {
    try {
      setLoading(true);
      setError(null);

      const url = new URL(CATEGORY_PREFIX.INDEX);
      url.searchParams.append('page', page);
      url.searchParams.append('perPage', perPage);

      const response = await fetch(
        url.toString(),
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
        throw new Error('Failed to fetch categories');
      }

      const responseData = await response.json();

      setCategories(responseData.data || []);

      if (responseData._metadata && responseData._metadata.pagination) {
        setPagination({
          page: responseData._metadata.pagination.page,
          perPage: responseData._metadata.pagination.perPage,
          total: responseData._metadata.pagination.total,
          totalPage: responseData._metadata.pagination.totalPage,
        });
      }
    } catch (err) {
      setError('Error fetching categories');
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch categories'
      });
    } finally {
      setLoading(false);
    }
  }, [pagination.perPage, navigate]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handlePageChange = (page) => {
    fetchCategories(page, pagination.perPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPagination((prev) => ({ ...prev, perPage: newPerPage }));
    fetchCategories(1, newPerPage);
  };

  const handleEdit = (id) => {
    navigate(`/admin/categories/edit/${id}`);
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
          const response = await fetch(`${CATEGORY_PREFIX.INDEX}/${id}`, {
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
            throw new Error('Failed to delete category');
          }

          Swal.fire(
            'Deleted!',
            'Your category has been deleted.',
            'success'
          );

          fetchCategories(pagination.page, pagination.perPage);
        } catch (error) {
          console.error('Error deleting category:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete category'
          });
        }
      }
    });
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
      name: 'Nama',
      selector: (row) => row.name,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Deskripsi',
      selector: (row) => row.description,
      width: '450px',
    },
    {
      name: 'Tipe',
      selector: (row) => row.type,
      width: '150px',
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      ),
      width: '150px',
    },
  ];

  return (
    <div className="px-0">
      <h1 className="text-2xl font-bold mb-6 mt-10">Manajemen Kategori</h1>
      <div className="md:flex justify-end items-center mb-4">
        <button
          onClick={() => navigate('/admin/categories/add')}
          className="w-full md:w-1/3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Tambah Kategori
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <DataTable
        columns={columns}
        data={categories}
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
          !loading && !categories.length ? (
            <div className="text-center py-4">Tidak ada kategori ditemukan</div>
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
    </div>
  );
};

export default TableCategory;
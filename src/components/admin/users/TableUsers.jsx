import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { USER_PREFIX } from '../../../constants/apiPath';
import Swal from 'sweetalert2';

const TableCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
    totalPage: 0,
  });

  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);

  const fetchCategories = useCallback(async (page = 1, search = '', perPage = pagination.perPage) => {
    try {
      setLoading(true);
      setError(null);

      const url = new URL(USER_PREFIX.INDEX);
      url.searchParams.append('page', page);
      url.searchParams.append('perPage', perPage);
      if (search) {
        url.searchParams.append('search', search);
      }

      const token = localStorage.getItem('token');
      const response = await fetch(url.toString(),{
        headers: {
          'accept': 'application/json',
          'x-custom-lang': 'en',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();

      setCategories(result.data || []);

      if (result._metadata && result._metadata.pagination) {
        setPagination({
          page: result._metadata.pagination.page,
          perPage: result._metadata.pagination.perPage,
          total: result._metadata.pagination.total,
          totalPage: result._metadata.pagination.totalPage,
        });
      }
    } catch (err) {
      setError('Error fetching categories');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.perPage]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSearch = (search) => {
    setSearchTerm(search);

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      fetchCategories(1, search);
    }, 500);
  };

  const handlePageChange = (page) => {
    fetchCategories(page, searchTerm, pagination.perPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPagination((prev) => ({ ...prev, perPage: newPerPage }));
    fetchCategories(1, searchTerm, newPerPage);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data pengguna ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await fetch(USER_PREFIX.DELETE(id), {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (response.ok) {
            await fetchCategories(pagination.page, searchTerm, pagination.perPage);
            Swal.fire('Terhapus!', 'Pengguna telah dihapus.', 'success');
          } else {
            throw new Error('Gagal menghapus');
          }
        } catch (err) {
          Swal.fire('Error!', 'Terjadi kesalahan saat menghapus Pengguna.', 'error');
          console.error('Error:', err);
        } finally {
          setLoading(false);
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
      selector: (row) => row.fullName,
      sortable: true,
      // width: '150px',
    },
    {
      name: 'Role',
      selector: (row) => row.roles.name,
      sortable: true,

      // width: '150px',
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,

      // width: '150px',
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/admin/user/edit/${row.id}`)}
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
      <h1 className="text-2xl font-bold mb-6 mt-10">Manajemen Pengguna</h1>
      <div className="md:flex justify-between items-center mb-4">
        <div className="md:w-1/3 w-full md:mb-3">
          <input
            type="text"
            placeholder="Cari pengguna..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => navigate('/admin/user/add')}
          className="w-full md:w-1/3 px-4 py-2 bg-blue-500 mt-3 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Buat Akun Pengguna
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
            <div className="text-center py-4">Tidak ada pengguna ditemukan</div>
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
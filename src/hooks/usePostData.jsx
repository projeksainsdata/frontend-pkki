// src/hooks/usePostData.js
import { useState } from 'react';
import { AxiosService } from '../services/axios.service';

const usePostData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const API = AxiosService.getAxiosAuth();
      const response = await API.post(url, payload);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(new Error(errorMessage));
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePostData;
import axios from 'axios';
import { AUTH_PATH } from './apiPath';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(AUTH_PATH.REGISTER, userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};
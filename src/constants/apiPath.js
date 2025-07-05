// src/constants/apiPath.js
export const API_URL = import.meta.env.VITE_API_URL;

export const UPLOAD_PATH = {
  UPLOAD: `${API_URL}/api/v1/public/aws/s3/upload`,
};
  
export const CATEGORY_PREFIX = {
  INDEX: `${API_URL}/api/v1/admin/categories`,
  CREATE: `${API_URL}/api/v1/admin/categories`,
  UPDATE: (id) => `${API_URL}/api/v1/admin/categories/${id}`,
  DELETE: (id) => `${API_URL}/api/v1/admin/categories/${id}`,
  DETAIL: (id) => `${API_URL}/api/v1/admin/categories/${id}`,
};

export const USER_PREFIX = {
  INDEX: `${API_URL}/api/v1/admin/users`,
  CREATE: `${API_URL}/api/v1/admin/users`,
  UPDATE: (id) => `${API_URL}/api/v1/admin/users/${id}`,
  DELETE: (id) => `${API_URL}/api/v1/admin/users/${id}`,
  DETAIL: (id) => `${API_URL}/api/v1/admin/users/${id}`,
};

export const ROLE_PREFIX = {
  INDEX: `${API_URL}/api/v1/admin/roles`,
  CREATE: `${API_URL}/api/v1/admin/roles`,
  UPDATE: (id) => `${API_URL}/api/v1/admin/roles/${id}`,
  DELETE: (id) => `${API_URL}/api/v1/admin/roles/${id}`,
  DETAIL: (id) => `${API_URL}/api/v1/admin/roles/${id}`,
};


export const BLOGS_PREFIX = {
  INDEX: `${API_URL}/api/v1/admin/blogs`,
  CREATE: `${API_URL}/api/v1/admin/blogs`,
  UPDATE: (id) => `${API_URL}/api/v1/admin/blogs/${id}`,
  DELETE: (id) => `${API_URL}/api/v1/admin/blogs/${id}`,
  DETAIL: (id) => `${API_URL}/api/v1/admin/blogs/${id}`,
};

export const AUTH_PATH = {
  LOGIN: `${API_URL}/api/v1/users/login`,
  REGISTER: `${API_URL}/api/v1/public/users/sign-up`,
  REFRESH_TOKEN: `${API_URL}/api/v1/refresh-token`,
  FORGOT_PASSWORD: `${API_URL}/api/v1/forgot-password`,
  RESET_PASSWORD: `${API_URL}/api/v1/reset-password`,
  VERIFY_EMAIL: `${API_URL}/api/v1/verify-email`,
  RESEND_EMAIL: `${API_URL}/api/v1/resend-email`,
  CONFIRM_EMAIL: `${API_URL}/api/v1/confirm-email`,
  LOGOUT: `${API_URL}/api/v1/logout`,
};

export const PUBLIC_PREFIX = {
  BLOG: `${API_URL}/api/v1/public/blogs`,
  REPOSITORIES: `${API_URL}/api/v1/public/repositories`,
  CATEGORIES:  `${API_URL}/api/v1/public/categories`
};
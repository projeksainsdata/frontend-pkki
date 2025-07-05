// src/utils/fileValidation.js
export const validateFile = (file) => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  
    if (!file) {
      throw new Error('Please select a file');
    }
  
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('File type not supported. Please use JPG, PNG or WebP');
    }
  
    if (file.size > MAX_SIZE) {
      throw new Error('File size too large. Maximum size is 5MB');
    }
  
    return true;
  };
  
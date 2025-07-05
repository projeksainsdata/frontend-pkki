// uplad image s3
import { AxiosService } from './axios.services';
import { UPLOAD_PATH } from '../constants/apiPath';
import axios from 'axios';

export const uploadImage = async (file) => {
  const API = AxiosService.getAxiosAuth();
  try {
    // Step 1: Request an upload token
    console.log('Requesting upload token...');
    const { data: tokenData } = await API.post(UPLOAD_PATH.TOKEN_UPLOAD);
    const token = tokenData?.data?.token;
    
    if (!token) {
      console.error('Token not found in response:', tokenData);
      return {
        success: false,
        message: "Failed to get upload token"
      };
    }

    // Step 2: Get file extension
    const extension = file.name.split(".").pop()?.toLowerCase();
    console.log('File extension:', extension);
    
    if (!extension) {
      return {
        success: false,
        message: "Failed to get file extension"
      };
    }

    // Step 3: Request a pre-signed URL using the token
    console.log('Requesting pre-signed URL...');
    const { data: urlData } = await API.post(UPLOAD_PATH.UPLOAD, {
      fileType: extension,
      token
    });

    const uploadUrl = urlData?.data?.uploadUrl;
    const imageId = urlData?.data?.imageId;

    if (!uploadUrl || !imageId) {
      console.error('Missing uploadUrl or imageId:', urlData);
      return {
        success: false,
        message: "Failed to get upload URL"
      };
    }

    // Step 4: Upload the file to S3
    console.log('Uploading to S3...');
    await axios.put(uploadUrl, file, {
      headers: { 
        "Content-Type": file.type,
        "Cache-Control": "max-age=31536000"
      }
    });

    // Step 5: Confirm the upload
    console.log('Confirming upload...');
    const { data: confirmationData } = await API.post(UPLOAD_PATH.CONFIRM, {
      imageId,
      metadata: {
        filename: file.name,
        contentType: file.type,
        size: file.size
      }
    });

    if (!confirmationData?.data?.url) {
      console.error('Missing URL in confirmation response:', confirmationData);
      return {
        success: false,
        message: "Failed to get final image URL"
      };
    }

    return {
      success: true,
      imageId: confirmationData.data.imageId,
      url: confirmationData.data.url,
      message: "Image uploaded successfully"
    };

  } catch (error) {
    console.error('Upload error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    return {
      success: false,
      message: error?.response?.data?.message || error.message || "Failed to upload image"
    };
  }
};
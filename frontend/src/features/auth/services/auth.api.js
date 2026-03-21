import axios from "axios";

const instance = axios.create({
  baseURL: 'https://codeforge-a-real-time-code-editor.onrender.com',
  withCredentials: true
});

export const registerApi = async (data) => {
  try {
    const response = await instance.post('/api/auth/register', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginApi = async (data) => {
  try {
    const response = await instance.post('/api/auth/login', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMeApi = async () => {
  try {
    const response = await instance.get('/api/auth/me');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await instance.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const resendVerificationEmailApi = async (data) => {
  try {
    const response = await instance.post("/api/auth/resend-email", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const updateProfileApi = async (formData) => {
  try {
    const response = await instance.patch("/api/auth/profile/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
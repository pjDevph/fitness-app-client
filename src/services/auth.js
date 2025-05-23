import api from './api';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get('/users/details');
    return response.data;
  } catch (error) {
    throw error;
  }
};
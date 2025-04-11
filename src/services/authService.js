import apiClient from './apiClient';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    throw error.response?.data || { message: 'Authentication failed' };
  }
};

export const register = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to send reset email' };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to reset password' };
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await apiClient.post('/auth/verify-email', { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Email verification failed' };
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const updateProfile = async (userData) => {
  try {
    const response = await apiClient.put('/auth/profile', userData);
    
    // Update stored user data
    const updatedUser = response.data;
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update profile' };
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await apiClient.post('/auth/change-password', { 
      currentPassword, 
      newPassword 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to change password' };
  }
};
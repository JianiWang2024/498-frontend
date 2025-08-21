import axios from 'axios';

// Railway后端地址
const API_BASE_URL = 'https://498-ai-client.up.railway.app';

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export const authApi = {
  // Register new user
  register: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/api/register`, userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/api/login`, credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await axios.post(`${API_BASE_URL}/api/logout`);
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await axios.get(`${API_BASE_URL}/api/current-user`);
    return response.data;
  }
};

export default authApi;
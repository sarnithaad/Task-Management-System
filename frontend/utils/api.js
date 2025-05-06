import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://task-management-system-1-1ekz.onrender.com', // Change to your backend URL
});

instance.interceptors.request.use(config => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default instance;

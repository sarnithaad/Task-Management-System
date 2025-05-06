import axios from 'axios';

const instance = axios.create({
  baseURL: 'task-management-system-9n1wwhna5-sarnitha-a-ds-projects.vercel.app', // Change to your backend URL
});

instance.interceptors.request.use(config => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default instance;

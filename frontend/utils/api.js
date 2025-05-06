import axios from 'axios';

// Use environment variable for baseURL, fallback to localhost for development
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

// Attach token from localStorage (if present) to every request
instance.interceptors.request.use(config => {
  // This check ensures window is defined (not SSR)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default instance;

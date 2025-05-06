import axios from 'axios';

const instance = axios.create({
  baseURL: typeof window === "undefined" ? process.env.API_URL : '', // or your API base
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

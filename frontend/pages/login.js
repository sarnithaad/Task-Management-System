import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await axios.post('/api/auth/login', form);
    localStorage.setItem('token', data.token);
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}

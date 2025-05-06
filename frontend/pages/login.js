import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';
import { setAuth } from '../utils/auth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      setAuth(res.data.token, res.data.user);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Login</h2>
      <input placeholder="Email" type="email" required value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" required value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

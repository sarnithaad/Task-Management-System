import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', form);
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Register</h2>
      <input placeholder="Name" required value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" type="email" required value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" required value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

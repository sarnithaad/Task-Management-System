import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', dob: '', doj: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('/api/auth/register', form);
      router.push('/login');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Registration failed. Please try again.'
      );
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" required onChange={handleChange} /><br /><br />
      <input name="email" type="email" placeholder="Email" required onChange={handleChange} /><br /><br />
      <input name="password" type="password" placeholder="Password" required onChange={handleChange} /><br /><br />
      <input name="dob" type="date" placeholder="Date of Birth" required onChange={handleChange} /><br /><br />
      <input name="doj" type="date" placeholder="Date of Joining" required onChange={handleChange} /><br /><br />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', dob: '', doj: '' });
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/auth/register', form);
    router.push('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" required onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
      <input name="dob" type="date" placeholder="Date of Birth" required onChange={handleChange} />
      <input name="doj" type="date" placeholder="Date of Joining" required onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

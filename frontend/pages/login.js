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
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url("/dashboard.jpg")', // Use your image name or Cloudinary URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255,255,255,0.85)', // Semi-transparent white
          borderRadius: 20,
          padding: '40px 32px',
          boxShadow: '0 8px 32px rgba(14,44,64,0.18)',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(2px)', // Subtle blur for glass effect
        }}
      >
        <h2
          style={{
            color: '#148D8D',
            fontWeight: 700,
            marginBottom: 30,
            fontSize: 32,
            letterSpacing: 1,
          }}
        >
          Login
        </h2>
        <input
          placeholder="Email"
          type="email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{
            width: '100%',
            padding: '12px 10px',
            marginBottom: 16,
            borderRadius: 8,
            border: '1px solid #C1E1A7',
            fontSize: 16,
            outline: 'none',
            transition: 'border 0.2s, box-shadow 0.2s',
            boxShadow: '0 1px 4px #148d8d11',
          }}
          onFocus={e => (e.target.style.border = '1.5px solid #148D8D')}
          onBlur={e => (e.target.style.border = '1px solid #C1E1A7')}
        />
        <input
          placeholder="Password"
          type="password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={{
            width: '100%',
            padding: '12px 10px',
            marginBottom: 24,
            borderRadius: 8,
            border: '1px solid #C1E1A7',
            fontSize: 16,
            outline: 'none',
            transition: 'border 0.2s, box-shadow 0.2s',
            boxShadow: '0 1px 4px #148d8d11',
          }}
          onFocus={e => (e.target.style.border = '1.5px solid #148D8D')}
          onBlur={e => (e.target.style.border = '1px solid #C1E1A7')}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 8,
            border: 'none',
            background: '#148D8D',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #148d8d22',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.target.style.background = '#1A4A5A')}
          onMouseOut={e => (e.target.style.background = '#148D8D')}
        >
          Login
        </button>
        {error && (
          <p style={{ color: '#d7263d', marginTop: 16, fontWeight: 500 }}>{error}</p>
        )}
      </form>
    </div>
  );
}

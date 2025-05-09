import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url("/registration.jpg")',
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
          background: 'rgba(255,255,255,0.9)',
          borderRadius: 20,
          padding: '40px 32px',
          boxShadow: '0 8px 32px rgba(14,44,64,0.18)',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(2px)',
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
          Register
        </h2>
        <input
          placeholder="Name"
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Email"
          type="email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Password"
          type="password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={inputStyle}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 8,
            border: 'none',
            background: loading ? '#C1E1A7' : '#148D8D',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #148d8d22',
            transition: 'background 0.2s',
            marginBottom: 10,
          }}
          onMouseOver={e => {
            if (!loading) e.target.style.background = '#1A4A5A';
          }}
          onMouseOut={e => {
            if (!loading) e.target.style.background = '#148D8D';
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && (
          <p style={{ color: '#e74c3c', marginTop: 8, fontWeight: 500 }}>{error}</p>
        )}
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 10px',
  marginBottom: 16,
  borderRadius: 8,
  border: '1px solid #C1E1A7',
  fontSize: 16,
  outline: 'none',
  transition: 'border 0.2s, box-shadow 0.2s',
  boxShadow: '0 1px 4px #148d8d11',
};


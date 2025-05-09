import TaskForm from '../components/TaskForm';
import api from '../utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreateTask() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (form) => {
    setLoading(true);
    setMsg('');
    try {
      await api.post('/tasks', form);
      setMsg('Task created successfully!');
      setTimeout(() => router.push('/dashboard'), 1200);
    } catch (err) {
      setMsg('Failed to create task.');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url("/create.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.92)',
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
          Create Task
        </h2>
        <TaskForm onSubmit={handleSubmit} loading={loading} />
        {msg && (
          <p style={{ color: msg.includes('success') ? '#27ae60' : '#e74c3c', marginTop: 10 }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

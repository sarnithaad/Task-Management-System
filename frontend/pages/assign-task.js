import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function AssignTask() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [taskId, setTaskId] = useState('');
  const [userId, setUserId] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUserId = localStorage.getItem('userId');
    api.get('/tasks').then(res => {
      const myTasks = res.data.filter(
        t => String(t.createdBy) === String(currentUserId)
      );
      setTasks(myTasks);
    });
    api.get('/users').then(res => setUsers(res.data));
  }, []);

  const handleAssign = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await api.post(`/tasks/${taskId}/assign`, { userId });
      setMsg('Task assigned and user notified!');
      setTaskId('');
      setUserId('');
    } catch (err) {
      setMsg('Assignment failed.');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url("/assigntask.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form
        onSubmit={handleAssign}
        style={{
          background: 'rgba(255,255,255,0.90)',
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
          Assign Task
        </h2>
        <select
          required
          value={taskId}
          onChange={e => setTaskId(e.target.value)}
          style={selectStyle}
        >
          <option value="">Select Task</option>
          {tasks.map(t => (
            <option key={t._id} value={t._id}>{t.title}</option>
          ))}
        </select>
        <select
          required
          value={userId}
          onChange={e => setUserId(e.target.value)}
          style={selectStyle}
        >
          <option value="">Select User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
          ))}
        </select>
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
          {loading ? 'Assigning...' : 'Assign'}
        </button>
        {msg && (
          <p style={{ color: msg.includes('failed') ? '#e74c3c' : '#27ae60', marginTop: 8, fontWeight: 500 }}>
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}

const selectStyle = {
  width: '100%',
  padding: '12px 10px',
  marginBottom: 16,
  borderRadius: 8,
  border: '1px solid #C1E1A7',
  fontSize: 16,
  outline: 'none',
  transition: 'border 0.2s, box-shadow 0.2s',
  boxShadow: '0 1px 4px #148d8d11',
  background: '#f9f9f9',
};

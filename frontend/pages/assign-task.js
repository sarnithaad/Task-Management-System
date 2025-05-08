import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function AssignTask() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [taskId, setTaskId] = useState('');
  const [userId, setUserId] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const currentUserId = localStorage.getItem('userId');
    console.log('Current User ID:', currentUserId);

    api.get('/tasks').then(res => {
      console.log('Fetched tasks:', res.data);
      const myTasks = res.data.filter(
        t => String(t.createdBy) === String(currentUserId)
      );
      console.log('Filtered tasks:', myTasks);
      setTasks(myTasks);
    });

    api.get('/users').then(res => setUsers(res.data));
  }, []);

  const handleAssign = async e => {
    e.preventDefault();
    await api.post(`/tasks/${taskId}/assign`, { userId });
    setMsg('Task assigned and user notified!');
  };

  return (
    <form onSubmit={handleAssign} style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Assign Task</h2>
      <select required value={taskId} onChange={e => setTaskId(e.target.value)}>
        <option value="">Select Task</option>
        {tasks.map(t => (
          <option key={t._id} value={t._id}>{t.title}</option>
        ))}
      </select>
      <select required value={userId} onChange={e => setUserId(e.target.value)}>
        <option value="">Select User</option>
        {users.map(u => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>
      <button type="submit">Assign</button>
      {msg && <p style={{ color: 'green' }}>{msg}</p>}
    </form>
  );
}

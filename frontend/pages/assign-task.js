import { useState, useEffect } from 'react';
import axios from '../utils/api';
import { useRouter } from 'next/router';

export default function AssignTask() {
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: '', assignee: '' });
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axios.get('/api/users');
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleChange = e => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/tasks/assign', task);
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Assign Task</h2>
      <input name="title" placeholder="Title" required onChange={handleChange} />
      <input name="description" placeholder="Description" required onChange={handleChange} />
      <input name="dueDate" type="date" required onChange={handleChange} />
      <select name="priority" required onChange={handleChange}>
        <option value="">Priority</option>
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select>
      <select name="assignee" required onChange={handleChange}>
        <option value="">Assign To</option>
        {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>
      <button type="submit">Assign</button>
    </form>
  );
}

import { useEffect, useState } from 'react';
import axios from '../utils/api';
import { useRouter } from 'next/router';


export default function AssignTask() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const usersRes = await axios.get('/api/users');
      setUsers(usersRes.data);
      const tasksRes = await axios.get('/api/tasks');
      setTasks(tasksRes.data);
    }
    fetchData();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    await axios.post('/api/tasks/assign', { taskId: selectedTask, userId: selectedUser });
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleAssign} style={{ maxWidth: 400, margin: "5vh auto", padding: 32, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Assign Task</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Task: </label>
        <select value={selectedTask} onChange={e => setSelectedTask(e.target.value)} required>
          <option value="">Select Task</option>
          {tasks.map(task => (
            <option key={task._id} value={task._id}>{task.title}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>User: </label>
        <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} required>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
          ))}
        </select>
      </div>
      <button type="submit" style={{ width: "100%" }}>Assign</button>
    </form>
  );
}

import { useEffect, useState } from 'react';
import axios from '../utils/api';
import { useRouter } from 'next/router';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilters from '../components/TaskFilters';
import Notification from '../components/Notification';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  // Fetch tasks
  useEffect(() => {
    async function fetchTasks() {
      const { data } = await axios.get('/api/tasks', { params: filters });
      setTasks(data);
    }
    fetchTasks();
  }, [filters]);

  // Fetch notifications
  useEffect(() => {
    async function fetchNotifications() {
      const { data } = await axios.get('/api/tasks/notifications');
      setNotifications(data);
    }
    fetchNotifications();
  }, []);

  const handleCreate = async (task) => {
    await axios.post('/api/tasks', task);
    setTasks([...tasks, task]);
  };

  const handleUpdate = async (id, updates) => {
    await axios.put(`/api/tasks/${id}`, updates);
    setTasks(tasks.map(t => t._id === id ? { ...t, ...updates } : t));
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div>
      <h2>Task Dashboard</h2>
      <button onClick={() => router.push('/assign-task')}>Assign Task</button>
      <Notification notifications={notifications} />
      <TaskForm onSubmit={handleCreate} />
      <TaskFilters setFilters={setFilters} />
      <TaskList
        tasks={tasks}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

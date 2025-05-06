import { useEffect, useState } from 'react';
import axios from '../utils/api';
import { useRouter } from 'next/router';
import TaskList from '../components/TaskList';
import TaskFilters from '../components/TaskFilters';
import Notification from '../components/Notification';
import Link from 'next/link';

const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);
  return due < new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const currentUserId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;

  useEffect(() => {
    async function fetchTasks() {
      const { data } = await axios.get('/api/tasks', { params: filters });
      setTasks(data);
    }
    fetchTasks();
  }, [filters]);

  useEffect(() => {
    async function fetchNotifications() {
      const { data } = await axios.get('/api/tasks/notifications');
      setNotifications(data);
    }
    fetchNotifications();
  }, []);

  const filteredTasks = tasks.filter(
    t =>
      t.assignedTo === currentUserId ||
      t.createdBy === currentUserId ||
      isOverdue(t.dueDate)
  );

  const handleUpdate = async (id, updates) => {
    await axios.put(`/api/tasks/${id}`, updates);
    setTasks(tasks.map(t => t._id === id ? { ...t, ...updates } : t));
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2>Task Dashboard</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Link href="/create-task"><button>Create</button></Link>
        <Link href="/assign-task"><button>Assign Task</button></Link>
        <Link href="/search-filter"><button>Search/Filter</button></Link>
      </div>
      <Notification notifications={notifications} />
      <TaskFilters setFilters={setFilters} />
      <TaskList
        tasks={filteredTasks}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

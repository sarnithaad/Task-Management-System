import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';
import { getUser, clearAuth } from '../utils/auth';
import Notification from '../components/Notification';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    api.get('/tasks').then(res => setTasks(res.data));
    api.get('/users/notifications').then(res => setNotifications(res.data));
  }, []);

  const overdueTasks = tasks.filter(
    t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Completed'
  );
  const createdTasks = tasks.filter(t => t.createdBy === user?.id);
  const assignedTasks = tasks.filter(t => t.assignedTo === user?.id);

  return (
    <div style={{ maxWidth: 800, margin: '30px auto' }}>
      <h2>Welcome, {user?.name}</h2>
      <button onClick={() => { clearAuth(); router.push('/login'); }}>Logout</button>
      <Notification notifications={notifications} />
      <TaskList tasks={assignedTasks} title="Your Assigned Tasks" />
      <TaskList tasks={createdTasks} title="Tasks You Created" />
      <TaskList tasks={overdueTasks} title="Overdue Tasks" />
      <button onClick={() => router.push('/create-task')}>Create Task</button>
      <button onClick={() => router.push('/search-filter')}>Search/Filter</button>
      <button onClick={() => router.push('/assign-task')}>Assign Task</button>
    </div>
  );
}

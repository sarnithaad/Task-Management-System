import TaskForm from '../components/TaskForm';
import { useRouter } from 'next/router';
import axios from '../utils/api';

export default function CreateTask() {
  const router = useRouter();

  const handleCreate = async (task) => {
    const currentUserId = localStorage.getItem('userId');
    await axios.post('/api/tasks', { ...task, createdBy: currentUserId });
    router.push('/dashboard');
  };

  return (
    <div style={{ maxWidth: 500, margin: "5vh auto" }}>
      <h2>Create Task</h2>
      <TaskForm onSubmit={handleCreate} />
    </div>
  );
}

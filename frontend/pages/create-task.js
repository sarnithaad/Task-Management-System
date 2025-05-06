import TaskForm from '../components/TaskForm';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function CreateTask() {
  const router = useRouter();

  const handleSubmit = async (form) => {
    await api.post('/tasks', form);
    router.push('/dashboard');
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Create Task</h2>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}

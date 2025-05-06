import { useState } from 'react';

export default function TaskForm({ onSubmit }) {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: '', status: '' });

  const handleChange = e => setTask({ ...task, [e.target.name]: e.target.value });

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(task); }}>
      <input name="title" placeholder="Title" required onChange={handleChange} />
      <input name="description" placeholder="Description" required onChange={handleChange} />
      <input name="dueDate" type="date" required onChange={handleChange} />
      <select name="priority" required onChange={handleChange}>
        <option value="">Priority</option>
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select>
      <select name="status" required onChange={handleChange}>
        <option value="">Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
}

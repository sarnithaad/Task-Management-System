import { useState } from 'react';

export default function TaskForm({ onSubmit, initial = {} }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    dueDate: initial.dueDate ? initial.dueDate.slice(0,10) : '',
    priority: initial.priority || 'Low',
    status: initial.status || 'Pending'
  });

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
      <input placeholder="Title" required value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Description" value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })} />
      <input type="date" value={form.dueDate}
        onChange={e => setForm({ ...form, dueDate: e.target.value })} />
      <select value={form.priority}
        onChange={e => setForm({ ...form, priority: e.target.value })}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <select value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}>
        <option>Pending</option><option>In Progress</option><option>Completed</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
}

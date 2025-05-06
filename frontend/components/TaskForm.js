import { useState } from 'react';

export default function TaskForm({ onSubmit, initial = {} }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    dueDate: initial.dueDate || '',
    priority: initial.priority || '',
    status: initial.status || '',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Due Date:</label>
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} required />
      </div>
      <div>
        <label>Priority:</label>
        <select name="priority" value={form.priority} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit" style={{ marginTop: 12 }}>Submit</button>
    </form>
  );
}

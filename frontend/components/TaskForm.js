import { useState } from 'react';

export default function TaskForm({ onSubmit, initial = {}, loading = false }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    dueDate: initial.dueDate ? initial.dueDate.slice(0,10) : '',
    priority: initial.priority || 'Low',
    status: initial.status || 'Pending'
  });

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit(form); }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        alignItems: 'stretch'
      }}
      autoComplete="off"
    >
      <input
        placeholder="Title"
        required
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        style={inputStyle}
        maxLength={60}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }}
        maxLength={300}
      />

      <input
        type="date"
        value={form.dueDate}
        onChange={e => setForm({ ...form, dueDate: e.target.value })}
        style={inputStyle}
      />

      <select
        value={form.priority}
        onChange={e => setForm({ ...form, priority: e.target.value })}
        style={inputStyle}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
        style={inputStyle}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? '#b2dfdb' : '#148D8D',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 0',
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: 0.5,
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px #148d8d22',
          transition: 'background 0.15s'
        }}
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}

const inputStyle = {
  padding: '12px 14px',
  borderRadius: 8,
  border: '1.5px solid #C1E1A7',
  fontSize: 16,
  fontWeight: 500,
  background: '#f9fdfb',
  marginBottom: 0,
  outline: 'none',
  boxShadow: '0 1px 4px #148d8d11',
  transition: 'border 0.2s, box-shadow 0.2s',
};

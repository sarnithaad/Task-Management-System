import { useState } from 'react';

export default function TaskFilters({ setFilters }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  const applyFilters = () => {
    setFilters({ search, status, priority, dueDate });
  };

  return (
    <div>
      <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="">Priority</option>
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button onClick={applyFilters}>Filter</button>
    </div>
  );
}

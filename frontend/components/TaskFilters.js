import { useState } from 'react';

export default function TaskFilters({ onSearch }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ status: '', priority: '', dueDate: '' });

  const handleSubmit = e => {
    e.preventDefault();
    onSearch({ q: query, ...filters });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title or Description" value={query}
        onChange={e => setQuery(e.target.value)} />
      <select value={filters.status}
        onChange={e => setFilters({ ...filters, status: e.target.value })}>
        <option value="">Status</option>
        <option>Pending</option><option>In Progress</option><option>Completed</option>
      </select>
      <select value={filters.priority}
        onChange={e => setFilters({ ...filters, priority: e.target.value })}>
        <option value="">Priority</option>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <input type="date" value={filters.dueDate}
        onChange={e => setFilters({ ...filters, dueDate: e.target.value })} />
      <button type="submit">Search</button>
    </form>
  );
}

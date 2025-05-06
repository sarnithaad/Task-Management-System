import { useState } from 'react';
import TaskList from './TaskList';
import axios from '../utils/api';

export default function TaskFilters({ setFilters, showResults = false }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);

  const applyFilters = async (e) => {
    if (e) e.preventDefault();
    const filterObj = { search, status, priority, dueDate };
    if (showResults) {
      const { data } = await axios.get('/api/tasks', { params: filterObj });
      setTasks(data);
    } else if (setFilters) {
      setFilters(filterObj);
    }
  };

  return (
    <div>
      <form onSubmit={applyFilters} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400, margin: "2rem auto" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: 100 }}>Search:</label>
          <input value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: 100 }}>Status:</label>
          <select value={status} onChange={e => setStatus(e.target.value)} style={{ flex: 1 }}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: 100 }}>Priority:</label>
          <select value={priority} onChange={e => setPriority(e.target.value)} style={{ flex: 1 }}>
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: 100 }}>Due Date:</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ flex: 1 }} />
        </div>
        <button type="submit">Filter</button>
      </form>
      {showResults && <TaskList tasks={tasks} />}
    </div>
  );
}

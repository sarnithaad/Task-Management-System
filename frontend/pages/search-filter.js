import { useState } from 'react';
import api from '../utils/api';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';

export default function SearchFilter() {
  const [results, setResults] = useState([]);

  const handleSearch = async (params) => {
    const res = await api.get('/tasks/search', { params });
    setResults(res.data);
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto' }}>
      <h2>Search / Filter Tasks</h2>
      <TaskFilters onSearch={handleSearch} />
      <TaskList tasks={results} title="Results" />
    </div>
  );
}

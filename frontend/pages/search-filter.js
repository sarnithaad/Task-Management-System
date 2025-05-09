import { useState } from 'react';
import api from '../utils/api';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';

export default function SearchFilter() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (params) => {
    setLoading(true);
    const res = await api.get('/tasks/search', { params });
    setResults(res.data);
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url("/search.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.94)',
          borderRadius: 20,
          padding: '40px 32px',
          boxShadow: '0 8px 32px rgba(14,44,64,0.18)',
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(2px)',
        }}
      >
        <h2
          style={{
            color: '#148D8D',
            fontWeight: 700,
            marginBottom: 30,
            fontSize: 32,
            letterSpacing: 1,
          }}
        >
          Search / Filter Tasks
        </h2>
        <TaskFilters onSearch={handleSearch} />
        {loading ? (
          <p style={{ color: '#148D8D', marginTop: 20 }}>Loading...</p>
        ) : (
          <TaskList tasks={results} title="Results" />
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function TaskList({
  tasks,
  title,
  onStatusChange,   // function(taskId, newStatus)
  onDueDateChange,  // function(taskId, newDueDate)
}) {
  const [editingDueDate, setEditingDueDate] = useState(null);
  const [dueDateValue, setDueDateValue] = useState('');

  if (!tasks.length) return null;

  // Status color mapping
  const statusColor = status =>
    status === 'Pending'
      ? '#e74c3c'
      : status === 'In Progress'
      ? '#f39c12'
      : status === 'Completed'
      ? '#27ae60'
      : '#7f8c8d';

  return (
    <div style={{ marginBottom: 28 }}>
      <h4 style={{ color: '#C1E1A7', fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(t => (
          <li
            key={t._id}
            style={{
              background: 'rgba(255,255,255,0.85)',
              borderRadius: 10,
              marginBottom: 12,
              padding: '12px 18px',
              boxShadow: '0 1px 6px #0001',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 16 }}>{t.title}</div>
            <div>
              <span
                style={{
                  color: '#fff',
                  background: statusColor(t.status),
                  borderRadius: 6,
                  padding: '2px 10px',
                  fontWeight: 600,
                  fontSize: 13,
                  marginRight: 8,
                }}
              >
                {t.status}
              </span>
              {onStatusChange && (
                <select
                  value={t.status}
                  onChange={e => onStatusChange(t._id, e.target.value)}
                  style={{
                    marginLeft: 8,
                    padding: '2px 6px',
                    borderRadius: 5,
                    border: '1px solid #ddd',
                    fontWeight: 500,
                    background: '#f9f9f9',
                    cursor: 'pointer',
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              )}
            </div>
            <div>
              <span style={{ fontWeight: 500 }}>Due Date: </span>
              {onDueDateChange && editingDueDate === t._id ? (
                <>
                  <input
                    type="date"
                    value={dueDateValue}
                    onChange={e => setDueDateValue(e.target.value)}
                    style={{
                      padding: '2px 6px',
                      borderRadius: 5,
                      border: '1px solid #ddd',
                      marginRight: 8,
                    }}
                  />
                  <button
                    onClick={() => {
                      onDueDateChange(t._id, dueDateValue);
                      setEditingDueDate(null);
                    }}
                    style={{
                      background: '#148D8D',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 5,
                      padding: '2px 10px',
                      cursor: 'pointer',
                      marginRight: 4,
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingDueDate(null)}
                    style={{
                      background: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 5,
                      padding: '2px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{t.dueDate ? t.dueDate.slice(0, 10) : 'Not set'}</span>
                  {onDueDateChange && (
                    <button
                      onClick={() => {
                        setEditingDueDate(t._id);
                        setDueDateValue(t.dueDate ? t.dueDate.slice(0, 10) : '');
                      }}
                      style={{
                        marginLeft: 8,
                        background: '#EFBC75',
                        color: '#0E2C40',
                        border: 'none',
                        borderRadius: 5,
                        padding: '2px 10px',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

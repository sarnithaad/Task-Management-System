import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';
import { getUser, clearAuth } from '../utils/auth';
import Notification from '../components/Notification';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [sessionNotificationIds, setSessionNotificationIds] = useState([]);
  const router = useRouter();
  const user = getUser();

  // Polling for real-time updates (simple demo)
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    const fetchData = () => {
      api.get('/tasks').then(res => setTasks(res.data));
      api.get('/users/notifications').then(res => {
        setNotifications(res.data);

        // Save IDs of current notifications in sessionStorage (for NEW tag)
        const ids = res.data.map(n => n._id);
        sessionStorage.setItem('sessionNotificationIds', JSON.stringify(ids));
        setSessionNotificationIds(ids);
      });
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Load session notification IDs from sessionStorage on mount
  useEffect(() => {
    const ids = JSON.parse(sessionStorage.getItem('sessionNotificationIds') || '[]');
    setSessionNotificationIds(ids);
  }, []);

  const overdueTasks = tasks.filter(
    t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Completed'
  );
  const createdTasks = tasks.filter(t => t.createdBy === user?.id);
  const assignedTasks = tasks.filter(t => t.assignedTo === user?.id);

  // Status color mapping
  const statusColor = status =>
    status === 'Pending'
      ? '#e74c3c'
      : status === 'In Progress'
      ? '#f39c12'
      : status === 'Completed'
      ? '#27ae60'
      : '#7f8c8d';

  // Update status handler
  const handleStatusChange = async (taskId, newStatus) => {
    await api.patch(`/tasks/${taskId}`, { status: newStatus });
    setTasks(tasks =>
      tasks.map(t => (t._id === taskId ? { ...t, status: newStatus } : t))
    );

    if (newStatus === "Completed") {
      // Remove notifications related to this task and update sessionNotificationIds/sessionStorage
      setNotifications(prevNotifications => {
        const filtered = prevNotifications.filter(n => n.task !== taskId);

        // Update sessionNotificationIds and sessionStorage based on filtered notifications
        const filteredIds = sessionNotificationIds.filter(id =>
          filtered.some(n => n._id === id)
        );
        setSessionNotificationIds(filteredIds);
        sessionStorage.setItem('sessionNotificationIds', JSON.stringify(filteredIds));

        return filtered;
      });
    }
  };

  // Save due date handler (accepts newDueDate as argument)
  const saveDueDate = async (taskId, newDueDate) => {
    await api.patch(`/tasks/${taskId}`, { dueDate: newDueDate });
    setTasks(tasks =>
      tasks.map(t => (t._id === taskId ? { ...t, dueDate: newDueDate } : t))
    );
  };

  // Logout handler: clear session notification IDs
  const handleLogout = () => {
    clearAuth();
    sessionStorage.removeItem('sessionNotificationIds');
    router.push('/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url("/dashboard.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        padding: '0 0 60px 0',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '40px auto',
          background: 'rgba(14,44,64,0.80)',
          borderRadius: 20,
          padding: '36px 28px',
          boxShadow: '0 8px 32px #0E2C4022',
        }}
      >
        <h2 style={{ color: '#EFBC75', fontWeight: 800, fontSize: 32, marginBottom: 20 }}>
          Task Dashboard
        </h2>
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => router.push('/create-task')} style={navBtnStyle}>Create</button>
          <button onClick={() => router.push('/assign-task')} style={navBtnStyle}>Assign Task</button>
          <button onClick={() => router.push('/search-filter')} style={navBtnStyle}>Search/Filter</button>
          <button onClick={handleLogout} style={navBtnStyle}>Logout</button>
        </div>
        <Notification notifications={notifications} sessionNotificationIds={sessionNotificationIds} />
        <Section title="Your Assigned Tasks">
          {assignedTasks.length === 0 && <p style={{ color: '#fff' }}>No assigned tasks.</p>}
          {assignedTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              allowStatusEdit={user?.id === task.assignedTo}
              allowDueDateEdit={false}
              handleStatusChange={handleStatusChange}
              saveDueDate={saveDueDate}
              statusColor={statusColor}
            />
          ))}
        </Section>
        <Section title="Tasks You Created">
          {createdTasks.length === 0 && <p style={{ color: '#fff' }}>No tasks created.</p>}
          {createdTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              allowStatusEdit={false}
              allowDueDateEdit={user?.id === task.createdBy}
              handleStatusChange={handleStatusChange}
              saveDueDate={saveDueDate}
              statusColor={statusColor}
            />
          ))}
        </Section>
        <Section title="Overdue Tasks">
          {overdueTasks.length === 0 && <p style={{ color: '#fff' }}>No overdue tasks. 🎉</p>}
          {overdueTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              allowStatusEdit={user?.id === task.assignedTo}
              allowDueDateEdit={user?.id === task.createdBy}
              handleStatusChange={handleStatusChange}
              saveDueDate={saveDueDate}
              statusColor={statusColor}
            />
          ))}
        </Section>
      </div>
    </div>
  );
}

// Button style for navigation
const navBtnStyle = {
  marginRight: 12,
  padding: '9px 22px',
  borderRadius: 8,
  border: 'none',
  background: '#148D8D',
  color: '#fff',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 2px 8px #148d8d22',
  transition: 'background 0.2s',
};

// Section wrapper
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: '#C1E1A7', fontWeight: 700, fontSize: 22, marginBottom: 10 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// TaskCard component with local edit state
import { useState, useEffect } from 'react';
function TaskCard({ task, allowStatusEdit, allowDueDateEdit, handleStatusChange, saveDueDate, statusColor }) {
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [localDueDateValue, setLocalDueDateValue] = useState(task.dueDate ? task.dueDate.slice(0, 10) : '');

  // Sync local due date value with task prop if it changes (e.g., after save or polling)
  useEffect(() => {
    setLocalDueDateValue(task.dueDate ? task.dueDate.slice(0, 10) : '');
  }, [task.dueDate]);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 12,
        boxShadow: '0 2px 12px #0001',
        marginBottom: 18,
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 18 }}>{task.title}</div>
      <div style={{ color: '#555', fontSize: 14 }}>{task.description}</div>
      <div>
        <span
          style={{
            color: '#fff',
            background: statusColor(task.status),
            borderRadius: 6,
            padding: '2px 10px',
            fontWeight: 600,
            fontSize: 13,
            marginRight: 8,
          }}
        >
          {task.status}
        </span>
        {allowStatusEdit && (
          <select
            value={task.status}
            onChange={e => handleStatusChange(task._id, e.target.value)}
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
        {allowDueDateEdit && isEditingDueDate ? (
          <>
            <input
              type="date"
              value={localDueDateValue}
              onChange={e => setLocalDueDateValue(e.target.value)}
              style={{
                padding: '2px 6px',
                borderRadius: 5,
                border: '1px solid #ddd',
                marginRight: 8,
              }}
            />
            <button
              type="button"
              onClick={async () => {
                await saveDueDate(task._id, localDueDateValue);
                setIsEditingDueDate(false);
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
              type="button"
              onClick={() => {
                setIsEditingDueDate(false);
                setLocalDueDateValue(task.dueDate ? task.dueDate.slice(0, 10) : '');
              }}
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
            <span>{task.dueDate ? task.dueDate.slice(0, 10) : 'Not set'}</span>
            {allowDueDateEdit && (
              <button
                type="button"
                onClick={() => setIsEditingDueDate(true)}
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
    </div>
  );
}

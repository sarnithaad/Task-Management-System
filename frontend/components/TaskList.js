export default function TaskList({ tasks, title }) {
  if (!tasks.length) return null;
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            {t.title} - {t.status} - Due: {t.dueDate ? t.dueDate.slice(0,10) : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}

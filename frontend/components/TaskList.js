export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!Array.isArray(tasks)) return null; // Defensive: only render if tasks is an array

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length > 0 ? (
          tasks.map(task =>
            task ? (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => onUpdate(task._id, { status: 'Completed' })}>Complete</button>
                  <button onClick={() => onDelete(task._id)}>Delete</button>
                </td>
              </tr>
            ) : null
          )
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>No tasks found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

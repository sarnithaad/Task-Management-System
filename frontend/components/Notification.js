export default function Notification({ notifications }) {
  if (!Array.isArray(notifications) || notifications.length === 0) return null;
  return (
    <div style={{ background: "#f9f9f9", padding: 10, borderRadius: 6, marginBottom: 18 }}>
      <h4>Notifications</h4>
      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
}

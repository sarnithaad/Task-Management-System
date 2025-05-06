export default function Notification({ notifications }) {
  if (!notifications || notifications.length === 0) return null;
  return (
    <div>
      <h4>Notifications</h4>
      <ul>
        {notifications.map(n => (
          <li key={n._id}>{n.message} {n.read ? '' : <b>(new)</b>}</li>
        ))}
      </ul>
    </div>
  );
}

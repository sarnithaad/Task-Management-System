export default function Notification({ notifications }) {
  if (!notifications || notifications.length === 0) return null;
  return (
    <div style={{ margin: '24px 0' }}>
      <h4
        style={{
          color: '#1DBAB4',
          fontWeight: 800,
          fontSize: 20,
          marginBottom: 10,
          letterSpacing: 0.5,
        }}
      >
        Notifications
      </h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notifications.map(n => (
          <li
            key={n._id}
            style={{
              background: '#1DBAB4',
              color: '#fff',
              borderRadius: 8,
              padding: '10px 16px',
              marginBottom: 10,
              fontWeight: n.read ? 500 : 700,
              fontSize: 16,
              boxShadow: '0 2px 8px #1DBAB433',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: n.read ? 0.7 : 1,
              letterSpacing: 0.2,
            }}
          >
            <span>
              {n.message}
              {!n.read && (
                <span style={{
                  marginLeft: 10,
                  background: '#fff',
                  color: '#1DBAB4',
                  borderRadius: 6,
                  padding: '2px 8px',
                  fontWeight: 800,
                  fontSize: 13,
                  letterSpacing: 0.5,
                }}>
                  NEW
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

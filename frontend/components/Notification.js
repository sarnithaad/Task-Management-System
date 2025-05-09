export default function Notification({ notifications, sessionNotificationIds = [] }) {
  if (!notifications || notifications.length === 0) return null;
  return (
    <div style={{ margin: '24px 0' }}>
      <h4
        style={{
          color: '#000',
          fontWeight: 700,
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
              background: '#fff',
              color: '#000',
              borderRadius: 8,
              padding: '10px 16px',
              marginBottom: 10,
              fontWeight: 500,
              fontSize: 16,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              letterSpacing: 0.2,
            }}
          >
            <span>
              {n.message}
              {sessionNotificationIds.includes(n._id) && (
                <span
                  style={{
                    marginLeft: 10,
                    background: '#000',
                    color: '#fff',
                    borderRadius: 6,
                    padding: '2px 8px',
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 0.5,
                  }}
                >
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

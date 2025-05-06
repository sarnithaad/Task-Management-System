export default function Notification({ notifications }) {
    return (
      <div>
        {notifications.map((note, idx) => (
          <div key={idx} style={{ background: '#fffae6', padding: '8px', margin: '4px 0' }}>
            {note.message}
          </div>
        ))}
      </div>
    );
  }
  
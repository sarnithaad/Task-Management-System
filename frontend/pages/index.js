import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/welcome-page2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 16,
          padding: '40px 32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <h1 style={{ color: '#2563eb', fontWeight: 700, marginBottom: 32, fontSize: 36 }}>
          Task Mate
        </h1>
        <button
          style={{
            width: '100%',
            padding: '12px 0',
            marginBottom: 16,
            borderRadius: 8,
            border: 'none',
            background: '#2563eb',
            color: 'white',
            fontWeight: 600,
            fontSize: 18,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onClick={() => router.push('/register')}
        >
          Register
        </button>
        <button
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 8,
            border: 'none',
            background: '#f59e42',
            color: 'white',
            fontWeight: 600,
            fontSize: 18,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onClick={() => router.push('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
}

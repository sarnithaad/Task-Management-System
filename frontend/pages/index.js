import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0E2C40 0%, #1A4A5A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.92)',
          borderRadius: 20,
          padding: '48px 36px',
          boxShadow: '0 8px 32px rgba(14,44,64,0.18)',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            color: '#148D8D',
            fontWeight: 800,
            marginBottom: 28,
            fontSize: 40,
            letterSpacing: 1,
          }}
        >
          Task Mate
        </h1>
        <button
          style={{
            width: '100%',
            padding: '14px 0',
            marginBottom: 18,
            borderRadius: 8,
            border: 'none',
            background: '#148D8D',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #148d8d22',
            transition: 'background 0.2s',
          }}
          onClick={() => router.push('/register')}
          onMouseOver={e => (e.target.style.background = '#1A4A5A')}
          onMouseOut={e => (e.target.style.background = '#148D8D')}
        >
          Register
        </button>
        <button
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: 8,
            border: 'none',
            background: '#EFBC75',
            color: '#0E2C40',
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #efbc7522',
            transition: 'background 0.2s',
          }}
          onClick={() => router.push('/login')}
          onMouseOver={e => (e.target.style.background = '#C1E1A7')}
          onMouseOut={e => (e.target.style.background = '#EFBC75')}
        >
          Login
        </button>
      </div>
    </div>
  );
}

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h1>Welcome User</h1>
      <button onClick={() => router.push('/register')}>Register</button>
      <button onClick={() => router.push('/login')}>Login</button>
    </div>
  );
}

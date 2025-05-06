import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to the Task Management System</h1>
      <p>Use the navigation to login, register, or access your dashboard.</p>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/register">
          <button style={{ marginRight: "1rem" }}>Go to Register</button>
        </Link>
        <Link href="/login">
          <button>Go to Login</button>
        </Link>
      </div>
    </div>
  );
}

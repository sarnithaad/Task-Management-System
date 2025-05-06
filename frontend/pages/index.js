import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to the Task Management System</h1>
      <div style={{ marginTop: "2rem" }}>
        <Link href="/register">
          <button style={{ marginRight: "1rem" }}>Register</button>
        </Link>
        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

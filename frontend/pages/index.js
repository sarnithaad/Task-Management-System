// frontend/pages/index.js

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to the Task Management System</h1>
      <Link href="/register" passHref>
        <button>Go to Register</button>
      </Link>
    </div>
  );
}

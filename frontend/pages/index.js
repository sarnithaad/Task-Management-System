// frontend/pages/index.js

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to the Task Management System</h1>
      <button onClick={handleRegisterClick}>Go to Register</button>
    </div>
  );
}

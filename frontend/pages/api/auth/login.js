// frontend/pages/api/auth/login.js

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // In production, check user credentials against your database!
    // For demo, accept any email/password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Demo: always "succeed"
    res.status(200).json({ message: 'Login successful', user: { email } });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

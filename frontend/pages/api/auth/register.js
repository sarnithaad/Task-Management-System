// frontend/pages/api/auth/register.js

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // In a real app, validate and hash the password, and save user to DB!
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Demo response:
    res.status(201).json({ message: 'User registered', user: { name, email } });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

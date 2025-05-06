// frontend/pages/api/tasks.js

let tasks = []; // In-memory array for demo; use a DB in production!

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, dueDate, priority, status } = req.body;

    // Validate input
    if (!title || !description || !dueDate || !priority || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create new task (simulate ID)
    const newTask = {
      _id: Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      status,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

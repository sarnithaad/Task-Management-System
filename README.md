Task Management System - A full-stack web application for efficient task management, featuring user authentication, task creation and assignment, notifications, and advanced search/filter capabilities.

Setup Instructions
Backend:
1. Clone the repository:
  bash
  git clone https://github.com/sarnithaad/Task-Management-System/tree/master/backend
  cd backend
2. Install dependencies:
  bash
  npm install
3. Configure environment variables:
  Create a .env file in the root directory with the following content:
    text
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/taskdb
    JWT_SECRET=sharnithadhandapani
  Start the backend server:
    bash
    npm start
  The backend server will be accessible at http://localhost:5000.

Frontend
1. Clone the repository:
  bash
  git clone https://github.com/sarnithaad/Task-Management-System/tree/master/frontend
  cd frontend
2. Install dependencies:
  bash
  npm install
3. Start the frontend development server:
  bash
  npm run dev
  The frontend application will be accessible at http://localhost:3000.

Approach Explanation
Frontend:
  The frontend is developed using Next.js, providing server-side rendering and a modular component-based architecture. Axios is utilized for API communication, and JWT tokens are stored in localStorage for authentication purposes.

Backend:
  The backend is built with Express.js and MongoDB (via Mongoose). It exposes RESTful API endpoints for user authentication, task management (CRUD), assignment, notifications, and user retrieval. Authentication is managed using JWT.

Key Features:
  User Authentication: Registration and login with email and password.
  Dashboard: Displays assigned tasks, created tasks, overdue tasks, and user notifications.
  Task Management: Full CRUD operations for tasks.
  Task Assignment: Allows users to assign tasks to other registered users and notifies them upon assignment.
  Search/Filter: A dedicated page for searching and filtering tasks by title, description, status, priority, and due date.
  Notifications: Users receive notifications when tasks are assigned to them.

Project Structure:
  Backend: Organized into models, routes, and middleware for maintainability and scalability.
  Frontend: Utilizes reusable components and clear page separation for a clean and maintainable codebase.

Assumptions and Trade-offs
  Notifications:
  The notification system is implemented as a simple message queue in the database, retrieved on dashboard load. Real-time or push notifications are not implemented in this version.
  
  User Roles:
  All users have the same permissions; there is no distinction between admin and regular users.
  
  Task Assignment:
  Any registered user can assign tasks to any other registered user.
    
  Deployment:
  The application is configured for local development. Environment variables and sensitive information should be properly secured in production environments.
  
  Error Handling and Validation:
  Basic error handling and form validation are implemented. Additional validation and error management may be required for production use.

Additional Notes
  Ensure that MongoDB is running locally, or update the MONGO_URI in your .env file to point to your MongoDB instance.
  For production deployments, it is recommended to use HTTPS and secure all environment variables.
  The application can be extended with additional features such as password reset, user roles, and real-time notifications as needed.

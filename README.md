# To-Do App

A full-stack to-do application built with React frontend and Node.js/Express backend.

## Features

- User authentication (register/login)
- Create, read, update, and delete tasks
- Task priorities (1-4)
- Due dates with natural language parsing
- Subtasks support
- Project organization
- Real-time task management
- Responsive design

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Project Structure

```
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
├── package.json       # Root package.json for managing both apps
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Copy the environment file:
```bash
cp env.example .env
```

3. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Copy the environment file:
```bash
cp env.example .env
```

3. Update the `.env` file if needed:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Run Both Applications

From the root directory, you can run both frontend and backend simultaneously:

```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks for user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
- `DELETE /api/tasks/:id` - Delete a task
- `POST /api/tasks/:id/subtasks` - Add subtask
- `PATCH /api/tasks/:id/subtasks/:subtaskId` - Toggle subtask completion

### Projects
- `GET /api/projects` - Get all projects for user
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get a specific project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project
- `GET /api/projects/:id/stats` - Get project statistics

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Building for Production
```bash
npm run build
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## License

MIT
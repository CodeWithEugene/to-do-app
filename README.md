# 📝 Beautiful To-Do App

A modern, elegant task management application built with React, TypeScript, and Convex. Features a beautiful paper-inspired design with smooth animations and intuitive user experience.

![To-Do App](https://img.shields.io/badge/React-19.0.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue) ![Convex](https://img.shields.io/badge/Convex-1.21.1-green) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-orange)

## ✨ Features

### 🎨 Beautiful Design
- **Paper-inspired UI** with subtle textures and elegant typography
- **Smooth animations** powered by Framer Motion
- **Responsive design** that works on all devices
- **Custom color palette** with sage green, terracotta, and slate blue accents

### 📋 Task Management
- **Create tasks** with titles, descriptions, due dates, and priority levels
- **Smart date parsing** - type "tomorrow", "next week", or any natural language date
- **Priority system** with 4 levels (P1-P4) and visual indicators
- **Subtask support** - break down complex tasks into smaller steps
- **Quick task creation** with minimal input or detailed forms

### 📅 Organization
- **Tab-based navigation** - Today, Upcoming, and Completed views
- **Swipe gestures** for easy tab switching on mobile
- **Due date tracking** with visual status indicators (overdue, soon, future)
- **Project organization** (ready for future implementation)

### 🔐 Authentication
- **Multiple sign-in options** - Email/password or anonymous
- **Secure authentication** powered by Convex Auth
- **User-specific data** - all tasks are private to each user

### ⚡ Real-time Updates
- **Live synchronization** across all devices
- **Instant updates** when tasks are created, completed, or modified
- **Optimistic UI** for smooth user experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- A Convex account (free at [convex.dev](https://convex.dev))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeWithEugene/to-do-app.git
   cd to-do-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```
   This will:
   - Create a new Convex project
   - Set up the database schema
   - Generate API types
   - Start the development server

4. **Configure authentication**
   - Follow the Convex Auth setup guide
   - Add your authentication provider configuration

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to see the app in action!

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **React 19** with modern hooks and functional components
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations and transitions
- **Vite** for fast development and building

### Backend (Convex)
- **Real-time database** with automatic synchronization
- **Type-safe API** with generated TypeScript types
- **Authentication** with multiple provider support
- **Serverless functions** for business logic

### Key Components

#### `App.tsx`
Main application component that handles:
- Authentication state
- Tab navigation
- Task creation dialog
- User interface layout

#### `TaskList.tsx`
Displays tasks with:
- Priority indicators
- Due date badges
- Completion toggles
- Subtask management
- Smooth animations

#### `CreateTaskDialog.tsx`
Task creation interface featuring:
- Quick creation mode
- Detailed form with all options
- Smart date parsing
- Priority selection
- Form validation

#### `TabView.tsx`
Navigation component with:
- Tab switching
- Swipe gesture support
- Smooth transitions
- Responsive design

### Database Schema

#### Tasks Table
```typescript
{
  title: string
  description?: string
  dueDate: number
  priority: number // 1-4
  completed: boolean
  completedAt?: number
  projectId?: Id<"projects">
  userId: Id<"users">
  reminder?: number
}
```

#### Projects Table
```typescript
{
  name: string
  userId: Id<"users">
  color: string
}
```

#### Subtasks Table
```typescript
{
  taskId: Id<"tasks">
  title: string
  completed: boolean
  completedAt?: number
}
```

## 🎯 Usage Guide

### Creating Tasks
1. Click the **"New Task"** button
2. Type your task title
3. Choose to add details or create quickly
4. Set due date using natural language or quick options
5. Select priority level (P1 = highest, P4 = lowest)
6. Add notes or description
7. Click **"Create Task"**

### Managing Tasks
- **Complete tasks** by clicking the checkbox
- **View subtasks** by clicking the arrow button
- **Add subtasks** in the expanded view
- **See due dates** with color-coded status badges

### Navigation
- **Today** - Tasks due today
- **Upcoming** - All future tasks
- **Completed** - Finished tasks
- **Swipe** between tabs on mobile devices

## 🎨 Design System

### Color Palette
- **Paper White** (`#F5F2E9`) - Background
- **Ink Dark** (`#2C3E50`) - Text
- **Sage Green** (`#7C9082`) - Accent
- **Terracotta** (`#C17C74`) - Priority 2
- **Slate Blue** (`#7C93C3`) - Primary actions

### Typography
- **Merriweather** - Headers and serif text
- **Open Sans** - Body text and UI elements

### Components
- **Paper Cards** - Main content containers with subtle textures
- **Priority Indicators** - Colored left borders
- **Due Date Badges** - Status-based styling
- **Smooth Animations** - Framer Motion powered

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run dev:frontend` - Frontend only
- `npm run dev:backend` - Backend only
- `npm run lint` - Run linting

### Project Structure
```
src/
├── components/          # React components
│   ├── CreateTaskDialog.tsx
│   ├── LandingPage.tsx
│   ├── TabView.tsx
│   └── TaskList.tsx
├── lib/                 # Utility functions
│   └── utils.ts
├── App.tsx             # Main app component
├── SignInForm.tsx      # Authentication
├── SignOutButton.tsx   # Sign out functionality
└── main.tsx           # App entry point

convex/
├── auth.config.ts     # Auth configuration
├── auth.ts           # Auth functions
├── projects.ts       # Project management
├── tasks.ts          # Task operations
├── schema.ts         # Database schema
└── _generated/       # Auto-generated types
```

## 🚀 Deployment

### Convex Deployment
```bash
npx convex deploy
```

### Frontend Deployment
The app can be deployed to any static hosting service:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Environment Variables
Set up the following environment variables:
- `CONVEX_DEPLOYMENT` - Your Convex deployment URL
- `CONVEX_SITE_URL` - Your app's URL for auth callbacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Convex** for the amazing real-time backend
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **React** team for the excellent framework
- **TypeScript** for type safety

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the [Convex documentation](https://docs.convex.dev)
- Review the [React documentation](https://react.dev)

---

**Built with ❤️ by [CodeWithEugene](https://github.com/CodeWithEugene)**
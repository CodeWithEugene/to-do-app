<<<<<<< HEAD
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
=======
# 📝 Modern To-Do App

A beautiful, feature-rich to-do application built with React, TypeScript, and Convex. Organize and track tasks easily with this modern app designed to help manage daily to-dos and boost productivity.

![To-Do App](https://img.shields.io/badge/React-19.0.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue) ![Convex](https://img.shields.io/badge/Convex-1.21.1-green) ![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)

## ✨ Features

### 🎯 Core Functionality
- **Task Management**: Create, edit, and delete tasks with ease
- **Smart Due Dates**: Natural language date parsing (e.g., "next Thursday", "tomorrow")
- **Priority Levels**: 4-level priority system (P1-P4) with visual indicators
- **Task Descriptions**: Add detailed notes and descriptions to tasks
- **Subtask Support**: Break down complex tasks into manageable subtasks
- **Real-time Sync**: All changes sync instantly across devices

### 🎨 User Experience
- **Modern UI**: Clean, paper-inspired design with smooth animations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Tabbed Interface**: Organize tasks by Today, Upcoming, and Completed
- **Swipe Gestures**: Navigate between tabs with intuitive swipe gestures
- **Visual Feedback**: Smooth animations and loading states
- **Undo Functionality**: Quick undo for completed tasks

### 🔐 Authentication & Security
- **Secure Authentication**: Built with Convex Auth
- **User Isolation**: Each user's tasks are completely private
- **Session Management**: Persistent login sessions
>>>>>>> e452c6d (Add comprehensive README and complete to-do app implementation)

### 🚀 Performance
- **Real-time Updates**: Instant synchronization using Convex
- **Optimistic UI**: Immediate feedback for better user experience
- **Efficient Queries**: Smart database indexing for fast performance

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Sonner** - Beautiful toast notifications

### Backend
- **Convex** - Real-time backend-as-a-service
- **Convex Auth** - Authentication system
- **Chrono Node** - Natural language date parsing

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
<<<<<<< HEAD
- A Convex account (free at [convex.dev](https://convex.dev))
=======
- Convex account (free tier available)
>>>>>>> e452c6d (Add comprehensive README and complete to-do app implementation)

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
<<<<<<< HEAD
   This will:
   - Create a new Convex project
   - Set up the database schema
   - Generate API types
   - Start the development server
=======
   Follow the prompts to create a new Convex project and configure authentication.
>>>>>>> e452c6d (Add comprehensive README and complete to-do app implementation)

4. **Configure authentication**
   - Follow the Convex Auth setup guide
   - Add your authentication provider configuration

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to see the app in action!

<<<<<<< HEAD
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
=======
## 📱 How to Use

### Creating Tasks
1. Click the **"New Task"** button
2. Enter your task title
3. Click **"Add Details"** for more options:
   - Set due date using natural language ("tomorrow", "next week")
   - Choose priority level (P1 = highest, P4 = lowest)
   - Add detailed notes and descriptions

### Managing Tasks
- **Complete Tasks**: Click the checkbox next to any task
- **View Subtasks**: Click the arrow icon to expand/collapse subtasks
- **Add Subtasks**: Use the form that appears when subtasks are expanded
- **Undo Completion**: Click "Undo" in the notification that appears

### Navigation
- **Today Tab**: Shows tasks due today
- **Upcoming Tab**: Shows all future tasks
- **Completed Tab**: Shows all completed tasks
- **Swipe Gestures**: Swipe left/right to navigate between tabs
>>>>>>> e452c6d (Add comprehensive README and complete to-do app implementation)

### Priority System
- **P1 (Red)**: Critical tasks that need immediate attention
- **P2 (Orange)**: Important tasks for today
- **P3 (Yellow)**: Medium priority tasks
- **P4 (Green)**: Low priority or optional tasks

<<<<<<< HEAD
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
=======
## 🏗️ Project Structure
>>>>>>> e452c6d (Add comprehensive README and complete to-do app implementation)

### Available Scripts
- `npm run dev` - Start development server
- `npm run dev:frontend` - Frontend only
- `npm run dev:backend` - Backend only
- `npm run lint` - Run linting

### Project Structure
```
<<<<<<< HEAD
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
=======
to-do-app/
├── src/
│   ├── components/          # React components
│   │   ├── CreateTaskDialog.tsx
│   │   ├── LandingPage.tsx
│   │   ├── TabView.tsx
│   │   └── TaskList.tsx
│   ├── lib/                 # Utility functions
│   ├── App.tsx             # Main app component
│   ├── SignInForm.tsx      # Authentication form
│   └── SignOutButton.tsx   # Sign out component
├── convex/                 # Backend functions
│   ├── auth.ts            # Authentication setup
│   ├── tasks.ts           # Task-related functions
│   ├── projects.ts        # Project management
│   └── schema.ts          # Database schema
├── public/                # Static assets
└── package.json          # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
VITE_CONVEX_URL=your_convex_url_here
VITE_CONVEX_DEPLOYMENT=your_deployment_name
```
>>>>>>> e452c6d (Add comprehensive README and complete to-do app implementation)

### Convex Setup
1. Create a Convex account at [convex.dev](https://convex.dev)
2. Create a new project
3. Configure authentication providers in `convex/auth.config.ts`
4. Deploy your functions with `npx convex deploy`

## 🎨 Customization

### Styling
The app uses Tailwind CSS with custom color variables defined in `src/index.css`. You can easily customize:

- Color scheme in the CSS variables
- Component styles in individual files
- Animation timing in Framer Motion components

### Adding Features
The modular architecture makes it easy to add new features:

- **New Task Types**: Extend the schema in `convex/schema.ts`
- **Additional Views**: Create new components and add them to `TabView.tsx`
- **Custom Fields**: Add new fields to the task creation form

## 🤝 Contributing

<<<<<<< HEAD
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
=======
We welcome contributions! Here's how you can help:
>>>>>>> e452c6d (Add comprehensive README and complete to-do app implementation)

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and patterns
- Add TypeScript types for all new functions
- Include proper error handling
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

<<<<<<< HEAD
- **Convex** for the amazing real-time backend
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **React** team for the excellent framework
- **TypeScript** for type safety
=======
- [Convex](https://convex.dev) for the amazing real-time backend
- [React](https://react.dev) for the powerful UI library
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Chrono Node](https://github.com/wanasit/chrono) for natural language date parsing
>>>>>>> e452c6d (Add comprehensive README and complete to-do app implementation)

## 📞 Support

If you have any questions or need help:
<<<<<<< HEAD
=======

>>>>>>> e452c6d (Add comprehensive README and complete to-do app implementation)
- Open an issue on GitHub
- Check the [Convex documentation](https://docs.convex.dev)
- Review the [React documentation](https://react.dev)

---

<<<<<<< HEAD
**Built with ❤️ by [CodeWithEugene](https://github.com/CodeWithEugene)**
=======
**Happy task managing! 🎉**
>>>>>>> e452c6d (Add comprehensive README and complete to-do app implementation)

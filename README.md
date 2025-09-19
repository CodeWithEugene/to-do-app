# Todo App - Feature-Rich Task Management

A comprehensive todo application built with Next.js, TypeScript, and modern web technologies. Features Google Calendar integration, smart task management, and beautiful UI components.

## 🚀 Features

### Core Features
- ✅ **Task Management**: Create, edit, delete, and complete tasks
- 📅 **Due Dates & Reminders**: Set due dates and reminder notifications
- 🏷️ **Priority Levels**: Low, Medium, High, and Urgent priority levels
- 📁 **Projects & Categories**: Organize tasks with projects and categories
- 🔄 **Recurring Tasks**: Daily, weekly, monthly, and yearly recurring tasks
- 🔍 **Search & Filter**: Advanced search and filtering capabilities
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices

### Advanced Features
- 🔐 **Google Authentication**: Secure login with Google OAuth2
- 📊 **Analytics Dashboard**: Track productivity and completion rates
- 🌙 **Dark Mode**: Beautiful dark and light themes
- 📅 **Google Calendar Sync**: Two-way sync with Google Calendar
- 🤖 **AI Assistant**: Smart suggestions and natural language input
- 📎 **File Attachments**: Attach files to tasks
- 🔔 **Notifications**: Browser and email reminders
- 📤 **Export/Import**: CSV and PDF export capabilities
- 💾 **Offline Support**: PWA-ready with offline functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth2
- **Calendar Integration**: Google Calendar API
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/todoapp?schema=public"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Google Calendar API
   GOOGLE_CALENDAR_API_KEY="your-google-calendar-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### Google Calendar API Setup

1. Enable the Google Calendar API in your Google Cloud project
2. Create an API key
3. Add the API key to your environment variables

### Database Setup

1. Create a PostgreSQL database
2. Update the `DATABASE_URL` in your environment variables
3. Run the Prisma migrations

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── tasks/         # Task CRUD operations
│   │   ├── projects/      # Project management
│   │   └── categories/    # Category management
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main application pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── tasks/            # Task-related components
│   └── providers/        # Context providers
├── lib/                  # Utility functions
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Utility functions
├── types/               # TypeScript type definitions
└── prisma/              # Database schema and migrations
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your app

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run all tests
npm run test:all
```

## 📱 PWA Features

The app is PWA-ready with:
- Service worker for offline functionality
- App manifest for installation
- Caching strategies for better performance
- Offline task management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Prisma](https://prisma.io/) for the database ORM
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

**Happy task managing! 🎉**
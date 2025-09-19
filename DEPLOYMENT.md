# Deployment Guide

This guide will help you deploy the Todo App to Vercel with all the necessary configurations.

## Prerequisites

- A Vercel account
- A PostgreSQL database (recommended: Supabase, PlanetScale, or Neon)
- Google Cloud Console account for OAuth and Calendar API

## Step 1: Database Setup

### Option A: Supabase (Recommended)

1. Go to [Supabase](https://supabase.com) and create a new project
2. Go to Settings > Database and copy the connection string
3. Update the `DATABASE_URL` in your environment variables

### Option B: PlanetScale

1. Go to [PlanetScale](https://planetscale.com) and create a new database
2. Create a connection string and update `DATABASE_URL`

### Option C: Neon

1. Go to [Neon](https://neon.tech) and create a new database
2. Copy the connection string and update `DATABASE_URL`

## Step 2: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google Calendar API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.vercel.app/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret

## Step 3: Google Calendar API Setup

1. In the same Google Cloud project, enable the Google Calendar API
2. Go to Credentials > Create Credentials > API Key
3. Restrict the API key to Google Calendar API
4. Copy the API key

## Step 4: Vercel Deployment

### Method 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variables:
   ```bash
   vercel env add DATABASE_URL
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add GOOGLE_CLIENT_ID
   vercel env add GOOGLE_CLIENT_SECRET
   vercel env add GOOGLE_CALENDAR_API_KEY
   ```

### Method 2: Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Set the following environment variables in the Vercel dashboard:

   ```
   DATABASE_URL=postgresql://username:password@host:port/database?schema=public
   NEXTAUTH_URL=https://yourdomain.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALENDAR_API_KEY=your-google-calendar-api-key
   ```

5. Deploy the project

## Step 5: Database Migration

After deployment, run the database migration:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

Or connect to your production database and run:

```bash
npx prisma db push
npx prisma db seed
```

## Step 6: Domain Configuration

1. In Vercel dashboard, go to your project settings
2. Add your custom domain if desired
3. Update the `NEXTAUTH_URL` environment variable with your custom domain
4. Update Google OAuth redirect URIs with your custom domain

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Your app's URL | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `GOOGLE_CALENDAR_API_KEY` | Google Calendar API key | No |

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `DATABASE_URL` format
   - Ensure your database is accessible from Vercel
   - Check if your database requires SSL

2. **OAuth Redirect Mismatch**
   - Ensure redirect URIs in Google Console match your domain
   - Check `NEXTAUTH_URL` environment variable

3. **Build Failures**
   - Check if all environment variables are set
   - Ensure Prisma schema is valid
   - Check for TypeScript errors

4. **Calendar Sync Issues**
   - Verify Google Calendar API is enabled
   - Check API key permissions
   - Ensure user has granted calendar permissions

### Performance Optimization

1. **Database Indexing**
   ```sql
   CREATE INDEX idx_tasks_user_id ON tasks(user_id);
   CREATE INDEX idx_tasks_due_date ON tasks(due_date);
   CREATE INDEX idx_tasks_completed ON tasks(completed);
   ```

2. **Caching**
   - Enable Vercel's edge caching
   - Use React Query for client-side caching
   - Implement Redis for session storage

3. **Image Optimization**
   - Use Next.js Image component
   - Enable WebP format
   - Implement lazy loading

## Monitoring

1. **Vercel Analytics**
   - Enable Vercel Analytics in dashboard
   - Monitor Core Web Vitals
   - Track user interactions

2. **Error Tracking**
   - Integrate Sentry for error tracking
   - Set up alerts for critical errors
   - Monitor API response times

3. **Database Monitoring**
   - Monitor query performance
   - Set up alerts for slow queries
   - Track connection pool usage

## Security Checklist

- [ ] Environment variables are properly secured
- [ ] Database connections use SSL
- [ ] OAuth redirect URIs are restricted
- [ ] API keys have proper permissions
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] SQL injection prevention
- [ ] XSS protection enabled

## Backup Strategy

1. **Database Backups**
   - Enable automatic backups in your database provider
   - Test restore procedures regularly
   - Store backups in multiple regions

2. **Code Backups**
   - Use Git for version control
   - Tag releases for easy rollback
   - Keep deployment logs

3. **User Data**
   - Implement data export functionality
   - Regular data integrity checks
   - GDPR compliance measures

## Scaling Considerations

1. **Database Scaling**
   - Use read replicas for read-heavy operations
   - Implement connection pooling
   - Consider database sharding for large datasets

2. **Application Scaling**
   - Use Vercel's automatic scaling
   - Implement caching strategies
   - Optimize bundle size

3. **CDN Configuration**
   - Use Vercel's global CDN
   - Optimize static assets
   - Implement proper cache headers

## Support

For deployment issues:

1. Check Vercel deployment logs
2. Review environment variable configuration
3. Test database connectivity
4. Verify OAuth configuration
5. Check Google API quotas

For additional help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Google Calendar API Documentation](https://developers.google.com/calendar)

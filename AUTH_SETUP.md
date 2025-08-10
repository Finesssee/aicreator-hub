# Authentication Setup Guide

## Quick Start

To run the application with authentication:

```bash
# Install dependencies
npm install

# Initialize the database (first time only)
node init-db.js

# Start both servers
npm run dev:all
```

This will start:
- Vite dev server on port 8080 (or next available)
- Auth server on port 5001

## How It Works

The authentication system uses BetterAuth with:
- SQLite database for storing user data
- Email/password authentication
- Session management with cookies
- Protected routes for My Space and Publish pages

## File Structure

- `auth-server-simple.mjs` - Express server handling auth requests
- `src/lib/auth-client.ts` - Client-side auth configuration
- `src/pages/AuthPage.tsx` - Login/signup UI
- `src/contexts/AuthContext.tsx` - React context for auth state
- `src/components/auth/ProtectedRoute.tsx` - Route protection wrapper
- `auth.db` - SQLite database file (created automatically)

## Testing Authentication

1. Navigate to http://localhost:8080
2. Click "Sign up" or "Log in" 
3. Create a new account or sign in
4. Access protected pages (My Space, Publish)

## Environment Variables

Create a `.env.local` file with:

```env
BETTER_AUTH_SECRET=your-secret-key-here-change-in-production
BETTER_AUTH_URL=http://localhost:5001
VITE_AUTH_URL=http://localhost:5001
AUTH_PORT=5001
```

## Production Deployment

For production on Vercel:

1. Set up a proper database (PostgreSQL recommended)
2. Update environment variables in Vercel dashboard
3. The API routes in `/api` folder will handle authentication

## Troubleshooting

If authentication isn't working:

1. Make sure both servers are running: `npm run dev:all`
2. Check that port 5001 is available for the auth server
3. Delete `auth.db` and run `node init-db.js` to reset the database
4. Check browser console for CORS errors
5. Ensure `.env.local` file exists with correct values

## Database Management

- Database file: `auth.db` (SQLite)
- Reset database: Delete `auth.db` and run `node init-db.js`
- View database: Use any SQLite viewer/browser

## Security Notes

- Change `BETTER_AUTH_SECRET` in production
- Use HTTPS in production
- Consider adding email verification
- Implement rate limiting for auth endpoints
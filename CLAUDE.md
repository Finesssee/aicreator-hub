# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start BOTH Vite and Auth servers (recommended)
npm run dev:all

# Or run servers separately:
npm run dev        # Vite dev server (port 8080)
npm run auth:dev   # Auth server (port 5001)

# Build for production
npm run build

# Build for development
npm run build:dev

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

This is an AI Creator Hub application built with React, TypeScript, and Vite. The application serves as a marketplace/platform for AI applications where users can browse, publish, and customize AI tools.

### Core Technology Stack
- **Build Tool**: Vite with React SWC plugin
- **UI Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with shadcn-ui component library
- **State Management**: React Query (Tanstack Query)
- **Database**: Mock Supabase implementation (currently uses in-memory data)

### Project Structure

```
src/
├── pages/              # Main route components
│   ├── LandingPage     # Homepage with features, testimonials
│   ├── ExplorePage     # Browse AI applications with filtering
│   ├── MySpacePage     # User's created/saved applications
│   ├── PublishPage     # Publish new AI applications
│   └── AppDetailPage   # Individual app details view
├── components/
│   ├── ui/            # shadcn-ui components (extensive library)
│   ├── layout/        # Layout components (Navigation)
│   └── seo/           # SEO wrapper component
├── lib/
│   ├── supabase.ts    # Mock database implementation
│   └── utils.ts       # Utility functions (cn for classNames)
└── assets/            # Static images for app thumbnails
```

### Routing Pattern

Routes are defined in `src/App.tsx`:
- `/` - Landing page
- `/explore` - Browse AI applications
- `/my-space` - User's workspace
- `/publish` - Publish new applications
- `/app/:slug` - Dynamic route for app details
- `*` - 404 Not Found page

### Component Architecture

The application uses:
- shadcn-ui components imported from `@/components/ui/`
- Custom `cn()` utility for merging Tailwind classes
- Path aliases configured: `@/` maps to `./src/`
- React Query for data fetching with provider wrapping the app

### Mock Data Layer

`src/lib/supabase.ts` contains:
- Mock implementation of Supabase-like API
- App and Run interfaces defining data structures
- Pre-populated demo data with 48 AI applications
- Categories: Chat & Agents, Image & Video, Audio & Music, Text & Content, Developer Tools & Automation, Creative & Fun

### TypeScript Configuration

The project has relaxed TypeScript settings:
- `noImplicitAny: false`
- `noUnusedParameters: false`
- `noUnusedLocals: false`
- `strictNullChecks: false`

### Authentication

The application includes authentication setup with:
- BetterAuth configuration (ready for production)
- Mock authentication for development (`src/lib/auth-mock.ts`)
- Protected routes using `ProtectedRoute` component
- Auth context provider wrapping the app
- Login/Signup page at `/auth`
- Session management in Navigation component

To switch from mock to real authentication:
1. Set up a proper database (PostgreSQL recommended)
2. Update `src/lib/auth-server.ts` with database credentials
3. Uncomment BetterAuth code in `src/lib/auth-client.ts`
4. Deploy API routes to handle authentication

### Deployment

The application is deployed on Vercel with:
- Automatic deployments from git
- API routes support via Vercel Functions
- Environment variables configuration
- Production URL: Set in Vercel dashboard
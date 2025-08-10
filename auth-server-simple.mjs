import { betterAuth } from 'better-auth';
import sqlite from 'better-sqlite3';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

const PORT = process.env.AUTH_PORT || 5001;

// Create SQLite database
const db = sqlite(join(__dirname, 'auth.db'));

// Initialize BetterAuth
const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  secret: process.env.BETTER_AUTH_SECRET || 'your-secret-key-here-change-in-production',
  trustedOrigins: [
    'http://localhost:8080',
    'http://localhost:8081', 
    'http://localhost:8082',
    'http://localhost:5173',
  ],
});

// Create a simple HTTP server
const server = createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // Get the request body
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }

    // Create a Request object for BetterAuth
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const request = new Request(url, {
      method: req.method,
      headers: Object.entries(req.headers).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
          acc[key] = value;
        }
        return acc;
      }, {}),
      body: body && req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,
    });

    // Pass to BetterAuth handler
    const response = await auth.handler(request);
    
    // Get response body
    const responseBody = await response.text();
    
    // Set status code
    res.statusCode = response.status;
    
    // Copy headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    // Send response
    res.end(responseBody);
  } catch (error) {
    console.error('Auth handler error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

server.listen(PORT, () => {
  console.log(`🔐 Auth server running on http://localhost:${PORT}`);
  console.log(`🔗 Test endpoints:`);
  console.log(`   - Session: http://localhost:${PORT}/api/auth/session`);
  console.log(`   - Sign up: http://localhost:${PORT}/api/auth/sign-up/email`);
  console.log(`   - Sign in: http://localhost:${PORT}/api/auth/sign-in/email`);
  console.log(`📝 Run "npm run dev:all" to start both Vite and auth servers`);
});
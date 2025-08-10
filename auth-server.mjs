import express from 'express';
import cors from 'cors';
import { betterAuth } from 'better-auth';
import sqlite from 'better-sqlite3';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.AUTH_PORT || 5001;

// Create SQLite database
const sqliteDb = sqlite(join(__dirname, 'auth.db'));

// Initialize BetterAuth with proper configuration
export const auth = betterAuth({
  database: sqliteDb,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disable for development
  },
  secret: process.env.BETTER_AUTH_SECRET || 'your-secret-key-here-change-in-production',
  trustedOrigins: [
    'http://localhost:8080',
    'http://localhost:8081', 
    'http://localhost:8082',
    'http://localhost:5173',
  ],
});

// Enable CORS
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON bodies
app.use(express.json());

// Mount BetterAuth handler - simplified approach
app.all('/*', async (req, res) => {
  try {
    // Create a proper Request object for BetterAuth
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const request = new Request(url, {
      method: req.method,
      headers: Object.entries(req.headers).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
          acc[key] = value;
        }
        return acc;
      }, {}),
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });
    
    // Pass the request to BetterAuth
    const response = await auth.handler(request);
    
    // Send the response back
    const body = await response.text();
    
    // Set status code
    res.status(response.status);
    
    // Copy headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    // Send body
    if (body) {
      try {
        res.json(JSON.parse(body));
      } catch {
        res.send(body);
      }
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Auth handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🔐 Auth server running on http://localhost:${PORT}`);
  console.log(`🔗 Test the auth server: http://localhost:${PORT}/api/auth/session`);
  console.log(`📝 Run "npm run dev:all" to start both Vite and auth servers`);
});
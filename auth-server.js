import express from 'express';
import cors from 'cors';
import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.AUTH_PORT || 5001;

// Create SQLite database
const db = new Database('./auth.db');

// Initialize BetterAuth
const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET || 'your-secret-key-here-change-in-production',
  baseURL: `http://localhost:${PORT}`,
});

// Enable CORS for your frontend
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:5173'],
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Mount BetterAuth handler
app.all('/api/auth/*', async (req, res) => {
  const request = new Request(`http://localhost:${PORT}${req.url}`, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
  });
  
  const response = await auth.handler(request);
  
  // Convert Response to express response
  const body = await response.text();
  res.status(response.status);
  
  // Copy headers
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  
  res.send(body);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Auth server is running' });
});

app.listen(PORT, () => {
  console.log(`🔐 Auth server running on http://localhost:${PORT}`);
  console.log(`🔗 Auth endpoint: http://localhost:${PORT}/api/auth`);
});
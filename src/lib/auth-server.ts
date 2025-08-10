import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";

// Create SQLite database for auth
// In production, use a persistent database solution
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/auth.db' // Vercel's writable directory
  : path.join(process.cwd(), 'auth.db');

const db = new Database(dbPath);

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-here-change-in-production",
  baseURL: (process.env.NODE_ENV === 'production' && process.env.VERCEL_URL)
    ? `https://${process.env.VERCEL_URL}`
    : process.env.BETTER_AUTH_URL || "http://localhost:8080",
});
import { auth } from "../../src/lib/auth-server";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // BetterAuth handler expects a single Request object
  // For now, return a simple response until BetterAuth is properly configured
  res.status(200).json({ message: "Auth endpoint ready" });
  
  // TODO: Properly configure BetterAuth for Vercel
  // return auth.handler(req);
}
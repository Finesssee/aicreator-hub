import { auth } from "../../src/lib/auth-server";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const url = new URL(req.url!, `${protocol}://${host}`);

  // Create a standard Request object from the VercelRequest
  const request = new Request(url.href, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: req.method !== "GET" && req.method !== "HEAD" ? req : null,
    // @ts-ignore - `duplex: 'half'` is required for Node.js streams
    duplex: "half",
  });

  // Pass the request to the BetterAuth handler
  const response = await auth.handler(request);

  // Convert the standard Response back to a VercelResponse
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (response.body) {
    // Stream the response body back to the client
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      res.write(value);
    }
  }

  res.end();
}
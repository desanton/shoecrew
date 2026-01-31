import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// NextAuth v4 with Next.js 15/16 compatibility
// Create handler with authOptions
const auth = NextAuth(authOptions);

// Wrap handlers to ensure searchParams are resolved
export async function GET(req: Request) {
  // Force URL parsing to ensure searchParams are available
  const url = new URL(req.url);
  const _searchParams = url.searchParams;
  return auth(req as any, { params: { nextauth: url.pathname.split("/").slice(3) } } as any);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const _searchParams = url.searchParams;
  return auth(req as any, { params: { nextauth: url.pathname.split("/").slice(3) } } as any);
}

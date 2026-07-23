import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;

  // Public routes
  const publicRoutes = [
    "/login",
    "/register",
  ];

  // Allow Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Allow login/register pages
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // No token → Login
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  try {
    jwt.verify(token, JWT_SECRET);

    return NextResponse.next();

  } catch {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/",
    "/transactions/:path*",
    "/accounts/:path*",
    "/goals/:path*",
  ],
};
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function proxy(request) {
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;

  const publicRoutes = [
    "/login",
    "/register",
  ];

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

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
    "/Transaction/:path*",
    "/Accounts/:path*",
    "/Goals/:path*",
    "/Report/:path*",
    "/Settings/:path*",
    "/Quickadd/:path*",
    "/EditProfile/:path*",
  ],
};

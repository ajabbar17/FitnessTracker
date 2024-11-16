import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");

  // Define the protected routes
  const protectedRoutes = ["/dashboard", "/workouts", "/tutorials"];
  const authRoutes = ["/auth/login", "/auth/signup"];

  // Check if the current route is protected
  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Check if the current route is an authentication route
  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    // Redirect to login page if not authenticated
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    // Redirect to dashboard if authenticated
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow request if authenticated or route is not protected
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workouts/:path*",
    "/tutorials/:path*",
    "/auth/login",
    "/auth/signup"
  ], // Match protected and auth routes
};

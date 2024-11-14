import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");
  console.log("Auth Token:", authToken); // This will appear in the terminal/server logs


  // Define the protected routes
  const protectedRoutes = ["/dashboard", "/workouts", "/tutorials"];

  // Check if the current route is protected
  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    // Redirect to login page if not authenticated
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request if authenticated or route is not protected
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/workouts/:path*", "/tutorials/:path*"], // Match protected routes
};

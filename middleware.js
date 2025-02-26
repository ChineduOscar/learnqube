import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const url = new URL(request.url);
  
  if (url.searchParams.has("token") && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }
  
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
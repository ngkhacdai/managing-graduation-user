import { NextResponse } from "next/server";

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isAuth = ["/login", "/"];
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  console.log(role);
  try {
    if (!isAuth.includes(path) && !token && !role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && role) {
      const headers = new Headers(req.headers);
      headers.set("role", role);
      return NextResponse.next({
        request: {
          headers,
        },
      });
    }
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/((?!api|_next|static|public|favicon.ico).*)",
};

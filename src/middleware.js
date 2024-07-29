import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode("your-very-secure-secret-key");

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isAuth = ["/login", "/"];
  const token = req.cookies.get("token")?.value;

  try {
    if (!isAuth.includes(path) && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token) {
      const { payload: decoded } = await jwtVerify(token, secretKey);
      req.user = decoded;
      const headers = new Headers(req.headers);
      headers.set("role", decoded.role);
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

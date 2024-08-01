import { NextResponse } from "next/server";

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isAuth = ["/login", "/"];
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  try {
    if (!isAuth.includes(path) && (!token || !role)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (
      [
        "/project/detail",
        "/project/detail/classwork",
        "/project/detail/classwork/[id]",
      ].includes(path)
    ) {
      const searchParams = req.nextUrl.searchParams;
      if (
        !searchParams.get("studentName") ||
        !searchParams.get("teacherName") ||
        !searchParams.get("projectName") ||
        !searchParams.get("projectId")
      ) {
        return NextResponse.redirect(new URL("/project", req.url));
      }
    }

    if (token && role) {
      if (role === "teacher" && ["/project/signup"].includes(path)) {
        return NextResponse.redirect(new URL("/project", req.url));
      }
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

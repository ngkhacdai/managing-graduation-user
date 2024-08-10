// middleware.ts
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "vi"],

  // Used when no locale matches
  defaultLocale: "en",

  async middleware(req) {
    const { pathname, locale } = req.nextUrl;
    const isAuth = ["/login", "/"];
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;

    try {
      // Token and role checks
      if (!isAuth.includes(pathname) && (!token || !role)) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      if (
        [
          "/project/detail",
          "/project/detail/classwork",
          "/project/detail/classwork/[id]",
        ].includes(pathname)
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
        if (pathname === "/login") {
          return NextResponse.redirect(new URL("/project", req.url));
        }
        if (role === "teacher" && ["/project/signup"].includes(pathname)) {
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

      // Locale check
      const supportedLocales = ["en", "vi"];
      if (locale && !supportedLocales.includes(locale)) {
        return NextResponse.redirect(new URL("/404", req.url)); // Redirect to a 404 page if locale is not supported
      }

      return NextResponse.next();
    } catch (err) {
      console.error("Error handling locale or token verification:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!api|_next|static|public|favicon.ico).*)", "/(en|vi)/:path*"],
};

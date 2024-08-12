import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const handleI18nRouting = createMiddleware({
  locales: ["en", "vi"],
  defaultLocale: "en",
});

export default async function middleware(req) {
  try {
    const supportedLocales = ["en", "vi"];

    const { pathname } = req.nextUrl;
    const lang = pathname.split("/")[1];
    const localeResponse = handleI18nRouting(req);

    if (!supportedLocales.includes(lang)) {
      return localeResponse;
    }
    const isAuth = [`/${lang}/login`, `/${lang}`];
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;

    if (!isAuth.includes(pathname) && (!token || !role)) {
      return NextResponse.redirect(new URL(`/${lang}`, req.url));
    }

    if (
      [
        `/${lang}/project/detail`,
        `/${lang}/project/detail/classwork`,
        `/${lang}/project/detail/classwork/[id]`,
      ].includes(pathname)
    ) {
      const searchParams = req.nextUrl.searchParams;
      if (
        !searchParams.get("studentName") ||
        !searchParams.get("teacherName") ||
        !searchParams.get("projectName") ||
        !searchParams.get("projectId")
      ) {
        return NextResponse.redirect(new URL(`/${lang}/project`, req.url));
      }
    }

    if (token && role) {
      if (pathname === `/${lang}/login`) {
        return NextResponse.redirect(new URL(`/${lang}/project`, req.url));
      }
      if (
        role === "teacher" &&
        [`/${lang}/project/signup`].includes(pathname)
      ) {
        return NextResponse.redirect(new URL(`/${lang}/project`, req.url));
      }
      localeResponse.headers.set("role", role);
    }

    // Locale check
    if (req.nextUrl.locale && !supportedLocales.includes(req.nextUrl.locale)) {
      return NextResponse.redirect(new URL(`${lang}/`, req.url)); // Redirect to a 404 page if locale is not supported
    }

    return localeResponse;
  } catch (err) {
    console.error("Error handling locale or token verification:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next|static|public|favicon.ico).*)", "/(en|vi)/:path*"],
};

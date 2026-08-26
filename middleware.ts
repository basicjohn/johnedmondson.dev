import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "de"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (pathnameHasLocale) return;

  const cookieLocale = request.cookies.get("locale")?.value;
  const locale =
    cookieLocale && locales.includes(cookieLocale)
      ? cookieLocale
      : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, the admin app, and static files
  matcher: ["/((?!_next|api|admin|favicon.ico|.*\\..*).*)"],
};

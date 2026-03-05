import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger rutas del wizard — verificación ligera de cookie Supabase
  if (pathname.startsWith("/wizard")) {
    const cookies = request.cookies.getAll();
    // @supabase/ssr almacena el token en "sb-<project-ref>-auth-token" (puede estar dividido en chunks)
    const hasAuthToken = cookies.some(
      (c) => c.name.includes("auth-token") && c.value.length > 0
    );

    if (!hasAuthToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/wizard/:path*"],
};

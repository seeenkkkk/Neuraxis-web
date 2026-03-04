import { NextResponse, type NextRequest } from "next/server";

// import { createServerClient } from "@supabase/ssr";
//
// export async function middleware(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({ request });
//
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) =>
//             request.cookies.set(name, value)
//           );
//           supabaseResponse = NextResponse.next({ request });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options)
//           );
//         },
//       },
//     }
//   );
//
//   const { data: { user } } = await supabase.auth.getUser();
//
//   const { pathname } = request.nextUrl;
//
//   // Protected routes: redirect to /login if not authenticated
//   const protectedPaths = [
//     "/dashboard", "/agents", "/chat", "/workflows", "/academy",
//     "/prompts", "/content", "/excel", "/clients", "/calendar",
//     "/roadmap", "/settings",
//   ];
//
//   const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
//
//   if (isProtected && !user) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }
//
//   // If logged in and trying to access auth pages, redirect to dashboard
//   if (user && (pathname === "/login" || pathname === "/register")) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   }
//
//   return supabaseResponse;
// }
//
// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

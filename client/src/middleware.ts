import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/portfolio-details(.*)","/building-portfolio(.*)","/dashboard(.*)" ]);

const isRedirectRoute = createRouteMatcher([ "/portfolio-details(.*)", "/building-portfolio(.*)" ]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  if (isProtectedRoute(req)) {
    if (!userId) return redirectToSignIn();
  }
  // Redirect signed-in users to dashboard.
  if (userId && (!isProtectedRoute(req) || isRedirectRoute(req)) ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
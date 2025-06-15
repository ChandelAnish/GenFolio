import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node"; // Or from '@clerk/clerk-sdk-node' if using the Node SDK
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/portfolio-details(.*)",
  "/building-portfolio(.*)",
  "/dashboard(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
  else if (userId) {
    const user = await clerkClient.users.getUser(userId);
    const hasPortfolio = user.publicMetadata?.hasPortfolio;

    console.log("hasPortfolio (live fetch):", hasPortfolio);

    if (isProtectedRoute(req)) {
      if (!hasPortfolio && req.nextUrl.pathname === "/dashboard") {
        return NextResponse.redirect(
          new URL("/portfolio-details/add-profile-details", req.url)
        );
      } else if (hasPortfolio) {
        if (req.nextUrl.pathname !== "/dashboard") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
    }
  }
});

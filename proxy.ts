import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY;
const clerkIsConfigured =
  Boolean(publishableKey) &&
  Boolean(secretKey) &&
  !publishableKey?.includes("YOUR_PUBLISHABLE_KEY") &&
  !secretKey?.includes("YOUR_SECRET_KEY");

export default clerkIsConfigured
  ? clerkMiddleware()
  : function proxy() {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

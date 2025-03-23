import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const response = NextResponse.redirect(new URL(`/portfolio/${username}`, req.nextUrl));

  response.headers.set(
    "Set-Cookie",
    `username=${encodeURIComponent(username)}; Path=/; HttpOnly; Max-Age=604800; SameSite=Lax; ${
      process.env.NODE_ENV === "production" ? "Secure" : ""
    }`
  );

  return response;
}

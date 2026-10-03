import { NextResponse } from "next/server";
import { adminSessionCookieName } from "@/lib/portfolio-api";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(adminSessionCookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}

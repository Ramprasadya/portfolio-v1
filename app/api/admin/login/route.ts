import { NextResponse } from "next/server";
import {
  adminSessionCookieName,
  adminSessionDurationSeconds,
  createAdminSession,
  databaseFailure,
  parseJsonObject,
  verifyAdminCredentials,
} from "@/lib/portfolio-api";

export async function POST(request: Request) {
  const body = await parseJsonObject(request);
  if (
    !body ||
    typeof body.username !== "string" ||
    typeof body.password !== "string" ||
    !body.username ||
    !body.password
  ) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  try {
    const validCredentials = await verifyAdminCredentials(body.username, body.password);
    if (!validCredentials) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const session = createAdminSession(body.username);
    if (!session) {
      return NextResponse.json(
        { error: "ADMIN_SESSION_SECRET must contain at least 32 bytes." },
        { status: 503 }
      );
    }

    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(adminSessionCookieName, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: adminSessionDurationSeconds,
    });
    return response;
  } catch (error) {
    return databaseFailure(error);
  }
}

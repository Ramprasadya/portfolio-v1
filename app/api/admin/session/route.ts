import { NextResponse } from "next/server";
import { hasValidAdminSession } from "@/lib/portfolio-api";

export async function GET(request: Request) {
  return NextResponse.json({ authenticated: hasValidAdminSession(request) });
}

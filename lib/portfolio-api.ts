import { createHmac, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";

type GlobalWithMongo = typeof globalThis & {
  portfolioMongooseConnection?: Promise<typeof mongoose>;
};

export type ProjectInput = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
};

export type SkillInput = {
  name: string;
  tags: string[];
  icon?: string;
};

const SESSION_COOKIE = "portfolio_admin_session";
const SESSION_DURATION_SECONDS = 8 * 60 * 60;
const scrypt = promisify(scryptCallback);

type AdminCredential = {
  username: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && Buffer.byteLength(secret) >= 32 ? secret : null;
}

export async function verifyAdminCredentials(username: string, password: string) {
  const admin = await (await getPortfolioDatabase())
    .collection<AdminCredential>("adminUsers")
    .findOne({ username });
  if (!admin) return false;

  const [saltHex, hashHex] = admin.passwordHash.split(":");
  if (!/^[\da-f]{32}$/i.test(saltHex ?? "") || !/^[\da-f]{128}$/i.test(hashHex ?? "")) {
    console.error("Invalid stored password hash for admin account.");
    return false;
  }

  const actualHash = (await scrypt(password, Buffer.from(saltHex, "hex"), 64)) as Buffer;
  return timingSafeEqual(actualHash, Buffer.from(hashHex, "hex"));
}

export function createAdminSession(username: string) {
  const secret = getSessionSecret();
  if (!secret) return null;

  const payload = Buffer.from(
    JSON.stringify({ username, expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000 })
  ).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function hasValidAdminSession(request: Request) {
  const secret = getSessionSecret();
  if (!secret) return false;

  const cookieHeader = request.headers.get("cookie") ?? "";
  const sessionCookie = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`));
  if (!sessionCookie) return false;

  const token = sessionCookie.slice(SESSION_COOKIE.length + 1);
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature) return false;

  const expectedSignature = createHmac("sha256", secret).update(payload).digest("base64url");
  if (!safeEqual(suppliedSignature, expectedSignature)) return false;

  try {
    const session: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return (
      session !== null &&
      typeof session === "object" &&
      "username" in session &&
      typeof session.username === "string" &&
      session.username.length > 0 &&
      "expiresAt" in session &&
      typeof session.expiresAt === "number" &&
      session.expiresAt > Date.now()
    );
  } catch {
    return false;
  }
}

export async function authorizeAdmin(request: Request) {
  if (hasValidAdminSession(request)) return null;

  const expectedToken = process.env.ADMIN_API_TOKEN;
  if (expectedToken) {
    const suppliedToken = request.headers.get("authorization")?.match(/^Bearer (.+)$/)?.[1];
    if (suppliedToken && safeEqual(suppliedToken, expectedToken)) return null;
  }

  if (!process.env.ADMIN_API_TOKEN && !getSessionSecret()) {
    return NextResponse.json(
      { error: "Write API is not configured." },
      { status: 503 }
    );
  }
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

export const adminSessionCookieName = SESSION_COOKIE;
export const adminSessionDurationSeconds = SESSION_DURATION_SECONDS;

export async function parseJsonObject(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await request.json();
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
      return null;
    }
    return body as Record<string, unknown>;
  } catch {
    return null;
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isNonEmptyString);
}

export function validateProject(body: Record<string, unknown>, partial = false): ProjectInput | null {
  const allowed = new Set(["title", "description", "tech", "github", "live", "image"]);
  if (Object.keys(body).some((key) => !allowed.has(key))) return null;

  if (partial) {
    if (Object.keys(body).length === 0) return null;
    if ("title" in body && !isNonEmptyString(body.title)) return null;
    if ("description" in body && !isNonEmptyString(body.description)) return null;
    if ("tech" in body && !isStringArray(body.tech)) return null;
    for (const key of ["github", "live", "image"] as const) {
      if (key in body && !isNonEmptyString(body[key])) return null;
    }
    return body as ProjectInput;
  }

  if (
    !isNonEmptyString(body.title) ||
    !isNonEmptyString(body.description) ||
    !isStringArray(body.tech)
  ) {
    return null;
  }

  for (const key of ["github", "live", "image"] as const) {
    if (key in body && !isNonEmptyString(body[key])) return null;
  }
  return body as ProjectInput;
}

export function validateSkill(body: Record<string, unknown>, partial = false): SkillInput | null {
  const allowed = new Set(["name", "tags", "icon"]);
  if (Object.keys(body).some((key) => !allowed.has(key))) return null;

  if (partial) {
    if (Object.keys(body).length === 0) return null;
    if ("name" in body && !isNonEmptyString(body.name)) return null;
    if ("tags" in body && !isStringArray(body.tags)) return null;
    if ("icon" in body && !isNonEmptyString(body.icon)) return null;
    return body as SkillInput;
  }

  if (!isNonEmptyString(body.name) || !isStringArray(body.tags)) return null;
  if ("icon" in body && !isNonEmptyString(body.icon)) return null;
  return body as SkillInput;
}

class DatabaseConfigurationError extends Error {}

export async function getPortfolioDatabase(): Promise<mongoose.mongo.Db> {
  const uri = process.env.mongo_uri ?? process.env.MONGO_URI ?? process.env.MONGODB_URI;
  if (!uri) throw new DatabaseConfigurationError("MONGO_URI is not configured.");

  const globalWithMongo = globalThis as GlobalWithMongo;
  globalWithMongo.portfolioMongooseConnection ??= mongoose
    .connect(uri, process.env.MONGODB_DB ? { dbName: process.env.MONGODB_DB } : {})
    .catch((error: unknown) => {
      globalWithMongo.portfolioMongooseConnection = undefined;
      throw error;
    });
  const connection = await globalWithMongo.portfolioMongooseConnection;
  const db = connection.connection.db;
  if (!db) throw new Error("Mongoose connected without an active database.");
  return db;
}

export function databaseFailure(error: unknown) {
  if (error instanceof DatabaseConfigurationError) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  console.error("Portfolio API database error:", error);
  return NextResponse.json({ error: "Unable to access portfolio data." }, { status: 500 });
}

export function getCollection<T extends mongoose.mongo.Document>(
  db: mongoose.mongo.Db,
  name: string
): mongoose.mongo.Collection<T> {
  return db.collection<T>(name);
}

export function parseObjectId(id: string): Types.ObjectId | null {
  return /^[\da-f]{24}$/i.test(id) ? new Types.ObjectId(id) : null;
}

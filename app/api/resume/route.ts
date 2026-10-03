import { NextResponse } from "next/server";
import {
  authorizeAdmin,
  databaseFailure,
  getPortfolioDatabase,
  parseJsonObject,
} from "@/lib/portfolio-api";

type ResumeDocument = {
  _id: "resume";
  url: string;
  updatedAt: Date;
};

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const resume = await (await getPortfolioDatabase())
      .collection<ResumeDocument>("portfolioSettings")
      .findOne({ _id: "resume" });
    if (!resume) return NextResponse.json({ error: "Resume link not found." }, { status: 404 });
    return NextResponse.json({ url: resume.url, updatedAt: resume.updatedAt });
  } catch (error) {
    return databaseFailure(error);
  }
}

export async function PUT(request: Request) {
  const unauthorized = await authorizeAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await parseJsonObject(request);
  if (!body || !isHttpUrl(body.url)) {
    return NextResponse.json({ error: "Provide a valid HTTP or HTTPS resume URL." }, { status: 400 });
  }

  try {
    const updatedAt = new Date();
    await (await getPortfolioDatabase())
      .collection<ResumeDocument>("portfolioSettings")
      .updateOne(
        { _id: "resume" },
        { $set: { url: body.url, updatedAt } },
        { upsert: true }
      );
    return NextResponse.json({ url: body.url, updatedAt });
  } catch (error) {
    return databaseFailure(error);
  }
}

export async function DELETE(request: Request) {
  const unauthorized = await authorizeAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const result = await (await getPortfolioDatabase())
      .collection<ResumeDocument>("portfolioSettings")
      .deleteOne({ _id: "resume" });
    if (!result.deletedCount) {
      return NextResponse.json({ error: "Resume link not found." }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return databaseFailure(error);
  }
}

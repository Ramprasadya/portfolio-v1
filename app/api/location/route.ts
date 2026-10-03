import { NextResponse } from "next/server";
import {
  authorizeAdmin,
  databaseFailure,
  getPortfolioDatabase,
  parseJsonObject,
} from "@/lib/portfolio-api";

type LocationDocument = {
  _id: "location";
  location: string;
  updatedAt: Date;
};

export async function GET() {
  try {
    const location = await (await getPortfolioDatabase())
      .collection<LocationDocument>("portfolioSettings")
      .findOne({ _id: "location" });
    if (!location) return NextResponse.json({ error: "Location not found." }, { status: 404 });
    return NextResponse.json({ location: location.location, updatedAt: location.updatedAt });
  } catch (error) {
    return databaseFailure(error);
  }
}

export async function PUT(request: Request) {
  const unauthorized = await authorizeAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await parseJsonObject(request);
  if (!body || typeof body.location !== "string" || !body.location.trim()) {
    return NextResponse.json({ error: "Provide a location." }, { status: 400 });
  }

  try {
    const location = body.location.trim();
    const updatedAt = new Date();
    await (await getPortfolioDatabase())
      .collection<LocationDocument>("portfolioSettings")
      .updateOne(
        { _id: "location" },
        { $set: { location, updatedAt } },
        { upsert: true }
      );
    return NextResponse.json({ location, updatedAt });
  } catch (error) {
    return databaseFailure(error);
  }
}

export async function DELETE(request: Request) {
  const unauthorized = await authorizeAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const result = await (await getPortfolioDatabase())
      .collection<LocationDocument>("portfolioSettings")
      .deleteOne({ _id: "location" });
    if (!result.deletedCount) {
      return NextResponse.json({ error: "Location not found." }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return databaseFailure(error);
  }
}

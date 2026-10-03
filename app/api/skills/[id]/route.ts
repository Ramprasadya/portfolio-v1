import { NextResponse } from "next/server";
import {
  authorizeAdmin,
  databaseFailure,
  getCollection,
  getPortfolioDatabase,
  parseJsonObject,
  parseObjectId,
  validateSkill,
  type SkillInput,
} from "@/lib/portfolio-api";

type SkillDocument = SkillInput & {
  createdAt: Date;
  updatedAt: Date;
};

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const _id = parseObjectId(id);
  if (!_id) return NextResponse.json({ error: "Invalid skill ID." }, { status: 400 });

  try {
    const skill = await getCollection<SkillDocument>(
      await getPortfolioDatabase(),
      "skills"
    ).findOne({ _id });
    if (!skill) return NextResponse.json({ error: "Skill not found." }, { status: 404 });
    return NextResponse.json({ ...skill, _id: skill._id.toString() });
  } catch (error) {
    return databaseFailure(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const unauthorized = await authorizeAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const _id = parseObjectId(id);
  if (!_id) return NextResponse.json({ error: "Invalid skill ID." }, { status: 400 });

  const body = await parseJsonObject(request);
  const skill = body && validateSkill(body, true);
  if (!skill) return NextResponse.json({ error: "Invalid skill fields." }, { status: 400 });

  try {
    const result = await getCollection<SkillDocument>(
      await getPortfolioDatabase(),
      "skills"
    ).findOneAndUpdate(
      { _id },
      { $set: { ...skill, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    if (!result) return NextResponse.json({ error: "Skill not found." }, { status: 404 });
    return NextResponse.json({ ...result, _id: result._id.toString() });
  } catch (error) {
    return databaseFailure(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const unauthorized = await authorizeAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const _id = parseObjectId(id);
  if (!_id) return NextResponse.json({ error: "Invalid skill ID." }, { status: 400 });

  const body = await parseJsonObject(request);
  const skill = body && validateSkill(body);
  if (!skill) return NextResponse.json({ error: "Invalid skill fields." }, { status: 400 });

  try {
    const unset: { icon?: "" } = {};
    if (!("icon" in skill)) unset.icon = "";
    const result = await getCollection<SkillDocument>(
      await getPortfolioDatabase(),
      "skills"
    ).findOneAndUpdate(
      { _id },
      { $set: { ...skill, updatedAt: new Date() }, ...(Object.keys(unset).length ? { $unset: unset } : {}) },
      { returnDocument: "after" }
    );
    if (!result) return NextResponse.json({ error: "Skill not found." }, { status: 404 });
    return NextResponse.json({ ...result, _id: result._id.toString() });
  } catch (error) {
    return databaseFailure(error);
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const unauthorized = await authorizeAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const _id = parseObjectId(id);
  if (!_id) return NextResponse.json({ error: "Invalid skill ID." }, { status: 400 });

  try {
    const result = await getCollection<SkillDocument>(
      await getPortfolioDatabase(),
      "skills"
    ).deleteOne({ _id });
    if (!result.deletedCount) {
      return NextResponse.json({ error: "Skill not found." }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return databaseFailure(error);
  }
}

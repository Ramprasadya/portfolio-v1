import { NextResponse } from "next/server";
import {
  authorizeAdmin,
  databaseFailure,
  getCollection,
  getPortfolioDatabase,
  parseJsonObject,
  parseObjectId,
  validateProject,
  type ProjectInput,
} from "@/lib/portfolio-api";

type ProjectDocument = ProjectInput & {
  createdAt: Date;
  updatedAt: Date;
};

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const _id = parseObjectId(id);
  if (!_id) return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });

  try {
    const project = await getCollection<ProjectDocument>(
      await getPortfolioDatabase(),
      "projects"
    ).findOne({ _id });
    if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    return NextResponse.json({ ...project, _id: project._id.toString() });
  } catch (error) {
    return databaseFailure(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const unauthorized = await authorizeAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const _id = parseObjectId(id);
  if (!_id) return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });

  const body = await parseJsonObject(request);
  const project = body && validateProject(body, true);
  if (!project) return NextResponse.json({ error: "Invalid project fields." }, { status: 400 });

  try {
    const result = await getCollection<ProjectDocument>(
      await getPortfolioDatabase(),
      "projects"
    ).findOneAndUpdate(
      { _id },
      { $set: { ...project, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    if (!result) return NextResponse.json({ error: "Project not found." }, { status: 404 });
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
  if (!_id) return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });

  const body = await parseJsonObject(request);
  const project = body && validateProject(body);
  if (!project) return NextResponse.json({ error: "Invalid project fields." }, { status: 400 });

  try {
    const unset: { github?: ""; live?: ""; image?: "" } = {};
    if (!("github" in project)) unset.github = "";
    if (!("live" in project)) unset.live = "";
    if (!("image" in project)) unset.image = "";
    const result = await getCollection<ProjectDocument>(
      await getPortfolioDatabase(),
      "projects"
    ).findOneAndUpdate(
      { _id },
      {
        $set: { ...project, updatedAt: new Date() },
        ...(Object.keys(unset).length > 0 ? { $unset: unset } : {}),
      },
      { returnDocument: "after" }
    );
    if (!result) return NextResponse.json({ error: "Project not found." }, { status: 404 });
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
  if (!_id) return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });

  try {
    const result = await getCollection<ProjectDocument>(
      await getPortfolioDatabase(),
      "projects"
    ).deleteOne({ _id });
    if (!result.deletedCount) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return databaseFailure(error);
  }
}

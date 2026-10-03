import { NextResponse } from "next/server";
import {
  authorizeAdmin,
  databaseFailure,
  getCollection,
  getPortfolioDatabase,
  parseJsonObject,
  validateProject,
  type ProjectInput,
} from "@/lib/portfolio-api";

type ProjectDocument = ProjectInput & {
  createdAt: Date;
  updatedAt: Date;
};

export async function GET() {
  try {
    const projects = await getCollection<ProjectDocument>(
      await getPortfolioDatabase(),
      "projects"
    )
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(projects.map((project) => ({ ...project, _id: project._id.toString() })));
  } catch (error) {
    return databaseFailure(error);
  }
}

export async function POST(request: Request) {
  const unauthorized = await authorizeAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await parseJsonObject(request);
  const project = body && validateProject(body);
  if (!project) {
    return NextResponse.json(
      { error: "Provide a title, description, a string array of tech, and valid optional links." },
      { status: 400 }
    );
  }

  try {
    const now = new Date();
    const document: ProjectDocument = { ...project, createdAt: now, updatedAt: now };
    const result = await getCollection<ProjectDocument>(
      await getPortfolioDatabase(),
      "projects"
    ).insertOne(document);
    return NextResponse.json({ ...document, _id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    return databaseFailure(error);
  }
}

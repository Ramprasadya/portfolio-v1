import { NextResponse } from "next/server";
import {
  authorizeAdmin,
  databaseFailure,
  getCollection,
  getPortfolioDatabase,
  parseJsonObject,
  validateSkill,
  type SkillInput,
} from "@/lib/portfolio-api";

type SkillDocument = SkillInput & {
  createdAt: Date;
  updatedAt: Date;
};

export async function GET() {
  try {
    const skills = await getCollection<SkillDocument>(
      await getPortfolioDatabase(),
      "skills"
    )
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(skills.map((skill) => ({ ...skill, _id: skill._id.toString() })));
  } catch (error) {
    return databaseFailure(error);
  }
}

export async function POST(request: Request) {
  const unauthorized = await authorizeAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await parseJsonObject(request);
  const skill = body && validateSkill(body);
  if (!skill) {
    return NextResponse.json(
      { error: "Provide a name, a string array of tags, and a valid optional icon." },
      { status: 400 }
    );
  }

  try {
    const now = new Date();
    const document: SkillDocument = { ...skill, createdAt: now, updatedAt: now };
    const result = await getCollection<SkillDocument>(
      await getPortfolioDatabase(),
      "skills"
    ).insertOne(document);
    return NextResponse.json({ ...document, _id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    return databaseFailure(error);
  }
}

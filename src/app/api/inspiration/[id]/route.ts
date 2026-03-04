import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await prisma.inspirationProject.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      patterns: true,
      products: true,
    },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) {
    data.title = body.title;
    data.slug = slugify(body.title);
  }
  if (body.description !== undefined) data.description = body.description;
  if (body.location !== undefined) data.location = body.location;
  if (body.architect !== undefined) data.architect = body.architect;
  if (body.architectUrl !== undefined) data.architectUrl = body.architectUrl;
  if (body.material !== undefined) data.material = body.material;
  if (body.finish !== undefined) data.finish = body.finish;
  if (body.projectType !== undefined) data.projectType = body.projectType;
  if (body.isFeatured !== undefined) data.isFeatured = body.isFeatured;
  if (body.isActive !== undefined) data.isActive = body.isActive;
  if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder;

  const project = await prisma.inspirationProject.update({
    where: { id },
    data,
  });
  return NextResponse.json(project);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.inspirationProject.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

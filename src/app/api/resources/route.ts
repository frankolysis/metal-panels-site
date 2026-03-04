import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const all = searchParams.get("all"); // if "true", include inactive (for admin)

  const resources = await prisma.resource.findMany({
    where: {
      ...(all !== "true" ? { isActive: true } : {}),
      ...(categoryId ? { categoryId } : {}),
    },
    include: {
      category: true,
      _count: { select: { downloads: true } },
    },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(resources);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  if (!body.title || !body.fileUrl || !body.categoryId) {
    return NextResponse.json(
      { error: "Title, file URL, and category are required" },
      { status: 400 }
    );
  }

  const resource = await prisma.resource.create({
    data: {
      title: body.title,
      description: body.description || null,
      fileUrl: body.fileUrl,
      fileType: body.fileType || null,
      fileSize: body.fileSize || null,
      thumbnail: body.thumbnail || null,
      categoryId: body.categoryId,
      isActive: body.isActive ?? true,
      sortOrder: body.sortOrder || 0,
    },
  });
  return NextResponse.json(resource, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const featured = searchParams.get("featured");
  const all = searchParams.get("all"); // if "true", include inactive (for admin)

  const projects = await prisma.inspirationProject.findMany({
    where: {
      ...(all !== "true" ? { isActive: true } : {}),
      ...(type ? { projectType: type as any } : {}),
      ...(featured === "true" ? { isFeatured: true } : {}),
    },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      patterns: true,
      products: true,
    },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  if (!body.title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const project = await prisma.inspirationProject.create({
    data: {
      title: body.title,
      slug: slugify(body.title),
      description: body.description || null,
      location: body.location || null,
      architect: body.architect || null,
      architectUrl: body.architectUrl || null,
      material: body.material || null,
      finish: body.finish || null,
      projectType: body.projectType || "COMMERCIAL",
      isFeatured: body.isFeatured || false,
      isActive: body.isActive ?? true,
      sortOrder: body.sortOrder || 0,
    },
  });

  // If a featured image URL was provided, create it as the first project image
  if (body.featuredImage) {
    await prisma.projectImage.create({
      data: {
        url: body.featuredImage,
        alt: body.title,
        sortOrder: 0,
        projectId: project.id,
      },
    });
  }

  return NextResponse.json(project, { status: 201 });
}

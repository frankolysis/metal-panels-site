import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const patterns = await prisma.pattern.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(patterns);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const pattern = await prisma.pattern.create({
    data: {
      name: body.name,
      slug: slugify(body.name),
      code: body.code || null,
      description: body.description || null,
      image: body.image || null,
      sizes: body.sizes || [],
      materials: body.materials || [],
      colors: body.colors || [],
      isActive: body.isActive ?? true,
      sortOrder: body.sortOrder || 0,
    },
  });
  return NextResponse.json(pattern, { status: 201 });
}

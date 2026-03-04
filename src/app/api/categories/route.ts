import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const categories = await prisma.productCategory.findMany({
    where: { isActive: true },
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const category = await prisma.productCategory.create({
    data: {
      name: body.name,
      slug: slugify(body.name),
      description: body.description || null,
      image: body.image || null,
      sortOrder: body.sortOrder || 0,
      isActive: body.isActive ?? true,
    },
  });
  return NextResponse.json(category, { status: 201 });
}

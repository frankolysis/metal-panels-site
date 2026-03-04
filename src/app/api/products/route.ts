import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(categoryId ? { categoryId } : {}),
    },
    include: { category: true, images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: slugify(body.name),
      description: body.description || null,
      features: body.features || null,
      categoryId: body.categoryId,
      isFeatured: body.isFeatured || false,
      isActive: body.isActive ?? true,
      sortOrder: body.sortOrder || 0,
    },
  });
  return NextResponse.json(product, { status: 201 });
}

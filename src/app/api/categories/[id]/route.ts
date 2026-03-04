import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.productCategory.findUnique({ where: { id }, include: { products: true } });
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const category = await prisma.productCategory.update({ where: { id }, data: { name: body.name, description: body.description, image: body.image, isActive: body.isActive, sortOrder: body.sortOrder } });
  return NextResponse.json(category);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.productCategory.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

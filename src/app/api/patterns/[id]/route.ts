import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pattern = await prisma.pattern.findUnique({ where: { id } });
  if (!pattern) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(pattern);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const pattern = await prisma.pattern.update({ where: { id }, data: { name: body.name, code: body.code, description: body.description, image: body.image, sizes: body.sizes, materials: body.materials, colors: body.colors, isActive: body.isActive, sortOrder: body.sortOrder } });
  return NextResponse.json(pattern);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.pattern.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

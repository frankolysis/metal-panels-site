import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const contact = await prisma.contactMessage.findUnique({ where: { id } });
  if (!contact) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(contact);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const contact = await prisma.contactMessage.update({ where: { id }, data: { status: body.status, adminNotes: body.adminNotes } });
  return NextResponse.json(contact);
}

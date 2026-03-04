import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contacts = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(contacts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const message = await prisma.contactMessage.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      subject: body.subject || null,
      message: body.message,
    },
  });
  return NextResponse.json(message, { status: 201 });
}

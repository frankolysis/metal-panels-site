import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(quotes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const quote = await prisma.quoteRequest.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      company: body.company || null,
      projectDetails: body.projectDetails,
      needsSamples: body.needsSamples || false,
      needsCADFiles: body.needsCADFiles || false,
      hasBidDeadline: body.hasBidDeadline || false,
      deadlineDate: body.deadlineDate ? new Date(body.deadlineDate) : null,
    },
  });
  return NextResponse.json(quote, { status: 201 });
}

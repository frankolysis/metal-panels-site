import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const faqs = await prisma.fAQ.findMany({
    where: {
      ...(category ? { category: { slug: category } } : {}),
    },
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
  });
  return NextResponse.json(faqs);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  if (!body.question || !body.answer || !body.categoryId) {
    return NextResponse.json(
      { error: "Question, answer, and category are required" },
      { status: 400 }
    );
  }

  const faq = await prisma.fAQ.create({
    data: {
      question: body.question,
      answer: body.answer,
      categoryId: body.categoryId,
      sortOrder: body.sortOrder || 0,
      isActive: body.isActive ?? true,
    },
    include: { category: true },
  });
  return NextResponse.json(faq, { status: 201 });
}

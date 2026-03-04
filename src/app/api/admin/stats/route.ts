import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [products, patterns, quotes, contacts, resources, inspiration, faqs, articles] = await Promise.all([
    prisma.product.count(),
    prisma.pattern.count(),
    prisma.quoteRequest.count(),
    prisma.contactMessage.count(),
    prisma.resource.count(),
    prisma.inspirationProject.count(),
    prisma.fAQ.count(),
    prisma.article.count(),
  ]);

  return NextResponse.json({ products, patterns, quotes, contacts, resources, inspiration, faqs, articles });
}

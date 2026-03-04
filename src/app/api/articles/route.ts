import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const published = searchParams.get("published");

  const articles = await prisma.article.findMany({
    where: {
      ...(category ? { category: { slug: category } } : {}),
      ...(published === "true" ? { isPublished: true } : {}),
      ...(published === "false" ? { isPublished: false } : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  if (!body.title || !body.content || !body.categoryId) {
    return NextResponse.json(
      { error: "Title, content, and category are required" },
      { status: 400 }
    );
  }

  const slug = body.slug || slugify(body.title);

  // Ensure slug is unique
  const existing = await prisma.article.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const article = await prisma.article.create({
    data: {
      title: body.title,
      slug: finalSlug,
      excerpt: body.excerpt || null,
      content: body.content,
      thumbnail: body.thumbnail || null,
      categoryId: body.categoryId,
      isPublished: body.isPublished || false,
      publishedAt: body.isPublished ? new Date() : null,
    },
    include: { category: true },
  });
  return NextResponse.json(article, { status: 201 });
}

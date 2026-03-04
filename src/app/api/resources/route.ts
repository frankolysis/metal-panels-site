import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const resources = await prisma.resource.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(resources);
}

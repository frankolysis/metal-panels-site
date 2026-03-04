"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminArticlesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Articles</h1>
        <Link href="/admin/articles/new" className="flex items-center gap-2 bg-[--color-brand-accent] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600"><Plus size={16} /> Add Article</Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">Manage blog articles. Create, edit, publish/unpublish, and categorize articles.</div>
    </div>
  );
}

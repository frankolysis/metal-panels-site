"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminFAQsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">FAQs</h1>
        <Link href="/admin/faqs/new" className="flex items-center gap-2 bg-[--color-brand-accent] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600"><Plus size={16} /> Add FAQ</Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">Manage frequently asked questions by category.</div>
    </div>
  );
}

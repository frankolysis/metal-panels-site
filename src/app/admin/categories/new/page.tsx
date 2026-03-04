"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", isActive: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    router.push("/admin/categories");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Category</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active</label>
        <div className="flex gap-2"><button type="submit" className="bg-[--color-brand-accent] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600">Save Category</button><button type="button" onClick={() => router.back()} className="border border-gray-300 px-6 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50">Cancel</button></div>
      </form>
    </div>
  );
}

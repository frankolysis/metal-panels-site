"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { RESOURCE_CATEGORIES } from "@/lib/constants";

interface ResourceCategory {
  id: string;
  name: string;
}

export default function EditResourcePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [resourceCategories, setResourceCategories] = useState<ResourceCategory[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    fileUrl: "",
    fileType: "",
    fileSize: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/resource-categories")
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
      fetch(`/api/resources/${id}`).then((r) => {
        if (!r.ok) throw new Error("Failed to load resource");
        return r.json();
      }),
    ])
      .then(([cats, resource]) => {
        setResourceCategories(cats);
        setForm({
          title: resource.title || "",
          description: resource.description || "",
          categoryId: resource.categoryId || "",
          fileUrl: resource.fileUrl || "",
          fileType: resource.fileType || "",
          fileSize: resource.fileSize || "",
          isActive: resource.isActive ?? true,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load resource");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/resources/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update resource");
      router.push("/admin/resources");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update resource");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error && !form.title) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Resource</h1>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
            <option value="">Select category</option>
            {resourceCategories.length > 0
              ? resourceCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))
              : RESOURCE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">File URL *</label>
          <input required value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="https://..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
            <input value={form.fileType} onChange={(e) => setForm({ ...form, fileType: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g., PDF, DWG, ZIP" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
            <input value={form.fileSize} onChange={(e) => setForm({ ...form, fileSize: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g., 2.5 MB" />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Published
        </label>
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="bg-brand-accent text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600 disabled:opacity-50">
            {saving ? "Saving..." : "Update Resource"}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-gray-300 px-6 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PROJECT_TYPES } from "@/lib/constants";

export default function EditInspirationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectType: "COMMERCIAL",
    location: "",
    architect: "",
    architectUrl: "",
    material: "",
    finish: "",
    isFeatured: false,
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/inspiration/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load inspiration project");
        return r.json();
      })
      .then((project) => {
        setForm({
          title: project.title || "",
          description: project.description || "",
          projectType: project.projectType || "COMMERCIAL",
          location: project.location || "",
          architect: project.architect || "",
          architectUrl: project.architectUrl || "",
          material: project.material || "",
          finish: project.finish || "",
          isFeatured: project.isFeatured ?? false,
          isActive: project.isActive ?? true,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load inspiration project");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/inspiration/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update inspiration project");
      router.push("/admin/inspiration");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update inspiration project");
      setSaving(false);
    }
  };

  // Map PROJECT_TYPES values to the enum values used in the database
  const projectTypeMap: Record<string, string> = {
    Commercial: "COMMERCIAL",
    Hospitality: "HOSPITALITY",
    Residential: "RESIDENTIAL",
    Retail: "RETAIL",
    "Public Spaces": "PUBLIC_SPACES",
    Healthcare: "HEALTHCARE",
    Education: "EDUCATION",
    "Mixed Use": "MIXED_USE",
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Inspiration Project</h1>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Type *</label>
          <select required value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={projectTypeMap[type] || type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g., Portland, OR" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Architect</label>
            <input value={form.architect} onChange={(e) => setForm({ ...form, architect: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Architect URL</label>
            <input value={form.architectUrl} onChange={(e) => setForm({ ...form, architectUrl: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="https://..." />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
            <input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g., Aluminum" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Finish</label>
            <input value={form.finish} onChange={(e) => setForm({ ...form, finish: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g., Powder Coated" />
          </div>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} /> Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active
          </label>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="bg-brand-accent text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600 disabled:opacity-50">
            {saving ? "Saving..." : "Update Project"}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-gray-300 px-6 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

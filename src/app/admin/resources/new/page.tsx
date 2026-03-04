"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RESOURCE_CATEGORIES } from "@/lib/constants";

interface ResourceCategory {
  id: string;
  name: string;
}

const FILE_TYPES = ["PDF", "DWG", "SPEC", "IMAGE", "OTHER"] as const;

export default function NewResourcePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    fileUrl: "",
    fileType: "",
    fileSize: "",
    isActive: true,
  });

  // Fetch resource categories from the database
  // The seed data creates ResourceCategory records matching RESOURCE_CATEGORIES
  useEffect(() => {
    // Try fetching from a resource-categories endpoint; fall back to using constants
    fetch("/api/resources?all=true")
      .then((r) => r.json())
      .then((resources: { category: ResourceCategory }[]) => {
        // Extract unique categories from existing resources
        const catMap = new Map<string, ResourceCategory>();
        resources.forEach((r: { category: ResourceCategory }) => {
          if (r.category) {
            catMap.set(r.category.id, r.category);
          }
        });
        const cats = Array.from(catMap.values());
        if (cats.length > 0) {
          setCategories(cats);
        }
      })
      .catch(() => {});
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.fileUrl.trim()) newErrors.fileUrl = "File URL is required";
    if (!form.categoryId && categories.length > 0)
      newErrors.categoryId = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create resource");
      }

      router.push("/admin/resources");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create resource"
      );
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Resource</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={
              "w-full rounded-md border px-3 py-2 text-sm " +
              (errors.title
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300")
            }
            placeholder="e.g., Product Specification Sheet"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="Brief description of this resource..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          {categories.length > 0 ? (
            <select
              required
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: e.target.value })
              }
              className={
                "w-full rounded-md border px-3 py-2 text-sm " +
                (errors.categoryId
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300")
              }
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          ) : (
            <select
              required
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Select category</option>
              {RESOURCE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            File URL *
          </label>
          <input
            required
            value={form.fileUrl}
            onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
            className={
              "w-full rounded-md border px-3 py-2 text-sm " +
              (errors.fileUrl
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300")
            }
            placeholder="https://... or /uploads/file.pdf"
          />
          {errors.fileUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.fileUrl}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File Type
            </label>
            <select
              value={form.fileType}
              onChange={(e) => setForm({ ...form, fileType: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Select file type</option>
              {FILE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File Size
            </label>
            <input
              value={form.fileSize}
              onChange={(e) => setForm({ ...form, fileSize: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g., 2.5 MB"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
            />{" "}
            Published
          </label>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-accent text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Resource"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border border-gray-300 px-6 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

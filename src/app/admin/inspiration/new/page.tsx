"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PROJECT_TYPES } from "@/lib/constants";

// Map display labels to database enum values
const PROJECT_TYPE_MAP: Record<string, string> = {
  Commercial: "COMMERCIAL",
  Hospitality: "HOSPITALITY",
  Residential: "RESIDENTIAL",
  Retail: "RETAIL",
  "Public Spaces": "PUBLIC_SPACES",
  Healthcare: "HEALTHCARE",
  Education: "EDUCATION",
  "Mixed Use": "MIXED_USE",
};

export default function NewInspirationPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectType: "COMMERCIAL",
    location: "",
    architect: "",
    architectUrl: "",
    material: "",
    finish: "",
    featuredImage: "",
    isFeatured: false,
    isActive: true,
  });

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/inspiration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create project");
      }

      router.push("/admin/inspiration");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create project"
      );
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        New Inspiration Project
      </h1>

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
            placeholder="e.g., Downtown Portland Office Tower"
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
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="Describe the project, its scope, and the metal panel solutions used..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Type *
          </label>
          <select
            required
            value={form.projectType}
            onChange={(e) =>
              setForm({ ...form, projectType: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={PROJECT_TYPE_MAP[type] || type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="e.g., Portland, OR"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Architect / Client
            </label>
            <input
              value={form.architect}
              onChange={(e) =>
                setForm({ ...form, architect: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="Firm or client name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Architect URL
            </label>
            <input
              value={form.architectUrl}
              onChange={(e) =>
                setForm({ ...form, architectUrl: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material
            </label>
            <input
              value={form.material}
              onChange={(e) =>
                setForm({ ...form, material: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g., Aluminum"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Finish
            </label>
            <input
              value={form.finish}
              onChange={(e) => setForm({ ...form, finish: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g., Powder Coated"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image URL
          </label>
          <input
            value={form.featuredImage}
            onChange={(e) =>
              setForm({ ...form, featuredImage: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="https://... or /uploads/project-image.jpg"
          />
          <p className="mt-1 text-xs text-gray-400">
            The primary image displayed in the gallery. Additional images can
            be added after creating the project.
          </p>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) =>
                setForm({ ...form, isFeatured: e.target.checked })
              }
            />{" "}
            Featured
          </label>
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
            {saving ? "Saving..." : "Save Project"}
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

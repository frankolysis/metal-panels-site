"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FAQ_CATEGORIES } from "@/lib/constants";

interface FAQCategory {
  id: string;
  name: string;
}

export default function EditFAQPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([]);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    categoryId: "",
    sortOrder: 0,
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/faq-categories")
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
      fetch(`/api/faqs/${id}`).then((r) => {
        if (!r.ok) throw new Error("Failed to load FAQ");
        return r.json();
      }),
    ])
      .then(([cats, faq]) => {
        setFaqCategories(cats);
        setForm({
          question: faq.question || "",
          answer: faq.answer || "",
          categoryId: faq.categoryId || "",
          sortOrder: faq.sortOrder ?? 0,
          isActive: faq.isActive ?? true,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load FAQ");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update FAQ");
      router.push("/admin/faqs");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update FAQ");
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

  if (error && !form.question) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit FAQ</h1>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
          <input required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
          <textarea required value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={6} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
            <option value="">Select category</option>
            {faqCategories.length > 0
              ? faqCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))
              : FAQ_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
          <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Published
        </label>
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="bg-brand-accent text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600 disabled:opacity-50">
            {saving ? "Saving..." : "Update FAQ"}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-gray-300 px-6 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

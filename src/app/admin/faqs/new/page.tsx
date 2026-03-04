"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FAQCategory {
  id: string;
  name: string;
  slug: string;
}

export default function NewFAQPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    categoryId: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    fetch("/api/faqs/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {
        // Fallback: fetch all FAQs and extract unique categories
        fetch("/api/faqs")
          .then((r) => r.json())
          .then((faqs: { category: FAQCategory }[]) => {
            const cats = faqs.reduce<FAQCategory[]>((acc, faq) => {
              if (faq.category && !acc.find((c) => c.id === faq.category.id)) {
                acc.push(faq.category);
              }
              return acc;
            }, []);
            setCategories(cats);
          })
          .catch(() => {});
      });
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.question.trim()) errs.question = "Question is required";
    if (!form.answer.trim()) errs.answer = "Answer is required";
    if (!form.categoryId) errs.categoryId = "Category is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ submit: data.error || "Failed to create FAQ" });
        setSubmitting(false);
        return;
      }

      router.push("/admin/faqs");
    } catch {
      setErrors({ submit: "Failed to create FAQ" });
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New FAQ</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl space-y-4"
      >
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {errors.submit}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question *
          </label>
          <input
            required
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            className={
              "w-full rounded-md border px-3 py-2 text-sm " +
              (errors.question
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300")
            }
            placeholder="Enter the frequently asked question"
          />
          {errors.question && (
            <p className="mt-1 text-sm text-red-500">{errors.question}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Answer *
          </label>
          <textarea
            required
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            rows={6}
            className={
              "w-full rounded-md border px-3 py-2 text-sm " +
              (errors.answer
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300")
            }
            placeholder="Enter the answer to this question"
          />
          {errors.answer && (
            <p className="mt-1 text-sm text-red-500">{errors.answer}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className={
              "w-full rounded-md border px-3 py-2 text-sm " +
              (errors.categoryId
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300")
            }
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Order
          </label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            min={0}
          />
          <p className="mt-1 text-xs text-gray-400">
            Lower numbers appear first
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Published
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-[--color-brand-accent] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save FAQ"}
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

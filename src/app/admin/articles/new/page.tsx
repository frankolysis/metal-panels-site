"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function NewArticlePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "",
    thumbnail: "",
    isPublished: false,
  });

  useEffect(() => {
    fetch("/api/articles/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {
        // Fallback: fetch all articles and extract unique categories
        fetch("/api/articles")
          .then((r) => r.json())
          .then((articles: { category: ArticleCategory }[]) => {
            const cats = articles.reduce<ArticleCategory[]>((acc, article) => {
              if (
                article.category &&
                !acc.find((c) => c.id === article.category.id)
              ) {
                acc.push(article.category);
              }
              return acc;
            }, []);
            setCategories(cats);
          })
          .catch(() => {});
      });
  }, []);

  const handleTitleChange = (title: string) => {
    const updates: Partial<typeof form> = { title };
    if (!slugManuallyEdited) {
      updates.slug = slugify(title);
    }
    setForm({ ...form, ...updates });
  };

  const handleSlugChange = (slug: string) => {
    setSlugManuallyEdited(true);
    setForm({ ...form, slug });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.content.trim()) errs.content = "Content is required";
    if (!form.categoryId) errs.categoryId = "Category is required";
    if (!form.slug.trim()) errs.slug = "Slug is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ submit: data.error || "Failed to create article" });
        setSubmitting(false);
        return;
      }

      router.push("/admin/articles");
    } catch {
      setErrors({ submit: "Failed to create article" });
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Article</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl space-y-4"
      >
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {errors.submit}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            required
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={
              "w-full rounded-md border px-3 py-2 text-sm " +
              (errors.title
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300")
            }
            placeholder="Enter article title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug *
          </label>
          <input
            required
            value={form.slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            className={
              "w-full rounded-md border px-3 py-2 text-sm font-mono " +
              (errors.slug
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300")
            }
            placeholder="article-url-slug"
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            Auto-generated from title. Edit to customize the URL.
          </p>
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
            Excerpt
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="Brief summary of the article (shown in listings)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={16}
            className={
              "w-full rounded-md border px-3 py-2 text-sm font-mono " +
              (errors.content
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300")
            }
            placeholder="Write the article content here..."
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image URL
          </label>
          <input
            type="url"
            value={form.thumbnail}
            onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) =>
                setForm({ ...form, isPublished: e.target.checked })
              }
            />
            Publish immediately
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-brand-accent text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Article"}
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

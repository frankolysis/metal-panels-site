"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: ArticleCategory;
  categoryId: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await fetch("/api/articles/" + id, { method: "DELETE" });
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const truncate = (str: string, len: number) =>
    str.length <= len ? str : str.slice(0, len) + "...";

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
        >
          <Plus size={16} /> Add Article
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Title
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Created
              </th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="text-sm font-medium">
                    {truncate(article.title, 60)}
                  </div>
                  {article.excerpt && (
                    <div className="text-xs text-gray-400 mt-0.5">
                      {truncate(article.excerpt, 80)}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {article.category?.name || "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      "text-xs px-2 py-0.5 rounded-full " +
                      (article.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700")
                    }
                  >
                    {article.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {formatDate(article.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={"/admin/articles/" + article.id + "/edit"}
                    className="text-gray-400 hover:text-brand inline-block mr-2"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No articles yet. Click &quot;Add Article&quot; to create your
                  first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

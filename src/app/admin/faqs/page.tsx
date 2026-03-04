"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

interface FAQCategory {
  id: string;
  name: string;
  slug: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  categoryId: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    await fetch("/api/faqs/" + id, { method: "DELETE" });
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  // Group FAQs by category
  const grouped = faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
    const catName = faq.category?.name || "Uncategorized";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(faq);
    return acc;
  }, {});

  const truncate = (str: string, len: number) =>
    str.length <= len ? str : str.slice(0, len) + "...";

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">FAQs</h1>
        <Link
          href="/admin/faqs/new"
          className="flex items-center gap-2 bg-[--color-brand-accent] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
        >
          <Plus size={16} /> Add FAQ
        </Link>
      </div>

      {faqs.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
          No FAQs yet. Click &quot;Add FAQ&quot; to create your first one.
        </div>
      ) : (
        Object.entries(grouped).map(([categoryName, categoryFaqs]) => (
          <div key={categoryName} className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {categoryName}
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                      Question
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 w-24">
                      Order
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 w-28">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-600 w-24">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoryFaqs.map((faq) => (
                    <tr key={faq.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">
                        {truncate(faq.question, 80)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {faq.sortOrder}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            "text-xs px-2 py-0.5 rounded-full " +
                            (faq.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600")
                          }
                        >
                          {faq.isActive ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={"/admin/faqs/" + faq.id + "/edit"}
                          className="text-gray-400 hover:text-[--color-brand] inline-block mr-2"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

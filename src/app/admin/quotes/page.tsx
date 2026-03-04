"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Quote { id: string; firstName: string; lastName: string; email: string; status: string; createdAt: string; }

const STATUS_COLORS: Record<string, string> = { NEW: "bg-blue-100 text-blue-700", REVIEWED: "bg-yellow-100 text-yellow-700", REPLIED: "bg-green-100 text-green-700", CLOSED: "bg-gray-100 text-gray-600" };

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    fetch("/api/quotes").then((r) => r.json()).then(setQuotes).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Quote Requests</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Name</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Email</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Date</th><th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Action</th></tr></thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium">{q.firstName} {q.lastName}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{q.email}</td>
                <td className="px-4 py-3"><span className={"text-xs px-2 py-0.5 rounded-full " + (STATUS_COLORS[q.status] || "bg-gray-100 text-gray-600")}>{q.status}</span></td>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(q.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right"><Link href={"/admin/quotes/" + q.id} className="text-sm text-[--color-brand-light] hover:underline">View</Link></td>
              </tr>
            ))}
            {quotes.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No quote requests yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

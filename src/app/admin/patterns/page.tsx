"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Pattern { id: string; name: string; code: string | null; isActive: boolean; }

export default function AdminPatternsPage() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  useEffect(() => {
    fetch("/api/patterns").then((r) => r.json()).then(setPatterns).catch(() => {});
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this pattern?")) return;
    await fetch("/api/patterns/" + id, { method: "DELETE" });
    setPatterns((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patterns</h1>
        <Link href="/admin/patterns/new" className="flex items-center gap-2 bg-[--color-brand-accent] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600"><Plus size={16} /> Add Pattern</Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Name</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Code</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th><th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th></tr></thead>
          <tbody>
            {patterns.map((pattern) => (
              <tr key={pattern.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium">{pattern.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{pattern.code || "-"}</td>
                <td className="px-4 py-3"><span className={"text-xs px-2 py-0.5 rounded-full " + (pattern.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>{pattern.isActive ? "Active" : "Inactive"}</span></td>
                <td className="px-4 py-3 text-right"><Link href={"/admin/patterns/" + pattern.id + "/edit"} className="text-gray-400 hover:text-[--color-brand] inline-block mr-2"><Edit size={16} /></Link><button onClick={() => handleDelete(pattern.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button></td>
              </tr>
            ))}
            {patterns.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No patterns yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

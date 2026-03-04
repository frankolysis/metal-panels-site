"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Contact { id: string; name: string; email: string; subject: string | null; status: string; createdAt: string; }

const STATUS_COLORS: Record<string, string> = { NEW: "bg-blue-100 text-blue-700", READ: "bg-yellow-100 text-yellow-700", REPLIED: "bg-green-100 text-green-700", CLOSED: "bg-gray-100 text-gray-600" };

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("/api/contacts").then((r) => r.json()).then(setContacts).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Messages</h1>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Name</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Email</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Subject</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Date</th><th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Action</th></tr></thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium">{c.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{c.email}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{c.subject || "-"}</td>
                <td className="px-4 py-3"><span className={"text-xs px-2 py-0.5 rounded-full " + (STATUS_COLORS[c.status] || "bg-gray-100 text-gray-600")}>{c.status}</span></td>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right"><Link href={"/admin/contacts/" + c.id} className="text-sm text-[--color-brand-light] hover:underline">View</Link></td>
              </tr>
            ))}
            {contacts.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No contact messages yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

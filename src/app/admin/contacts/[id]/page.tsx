"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Contact { id: string; name: string; email: string; phone: string | null; subject: string | null; message: string; status: string; adminNotes: string | null; createdAt: string; }

export default function ContactDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [contact, setContact] = useState<Contact | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("/api/contacts/" + params.id).then((r) => r.json()).then((data) => { setContact(data); setStatus(data.status); setNotes(data.adminNotes || ""); }).catch(() => {});
  }, [params.id]);

  const handleUpdate = async () => {
    await fetch("/api/contacts/" + params.id, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, adminNotes: notes }) });
    router.push("/admin/contacts");
  };

  if (!contact) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Message</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Message Details</h2>
          <dl className="space-y-2 text-sm">
            <div><dt className="text-gray-500">Name</dt><dd className="font-medium">{contact.name}</dd></div>
            <div><dt className="text-gray-500">Email</dt><dd>{contact.email}</dd></div>
            {contact.phone && <div><dt className="text-gray-500">Phone</dt><dd>{contact.phone}</dd></div>}
            {contact.subject && <div><dt className="text-gray-500">Subject</dt><dd>{contact.subject}</dd></div>}
            <div><dt className="text-gray-500">Received</dt><dd>{new Date(contact.createdAt).toLocaleString()}</dd></div>
          </dl>
          <h2 className="font-semibold text-gray-800 mt-6 mb-2">Message</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Admin Response</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"><option value="NEW">New</option><option value="READ">Read</option><option value="REPLIED">Replied</option><option value="CLOSED">Closed</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Add notes..." /></div>
            <div className="flex gap-2"><button onClick={handleUpdate} className="bg-brand-accent text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600">Update</button><button onClick={() => router.back()} className="border border-gray-300 px-6 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50">Back</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

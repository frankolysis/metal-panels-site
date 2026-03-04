"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Quote { id: string; firstName: string; lastName: string; email: string; phone: string; company: string | null; projectDetails: string; needsSamples: boolean; needsCADFiles: boolean; hasBidDeadline: boolean; deadlineDate: string | null; status: string; adminNotes: string | null; createdAt: string; }

export default function QuoteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("/api/quotes/" + params.id).then((r) => r.json()).then((data) => { setQuote(data); setStatus(data.status); setNotes(data.adminNotes || ""); }).catch(() => {});
  }, [params.id]);

  const handleUpdate = async () => {
    await fetch("/api/quotes/" + params.id, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, adminNotes: notes }) });
    router.push("/admin/quotes");
  };

  if (!quote) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Quote Request</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Contact Info</h2>
          <dl className="space-y-2 text-sm">
            <div><dt className="text-gray-500">Name</dt><dd className="font-medium">{quote.firstName} {quote.lastName}</dd></div>
            <div><dt className="text-gray-500">Email</dt><dd>{quote.email}</dd></div>
            <div><dt className="text-gray-500">Phone</dt><dd>{quote.phone}</dd></div>
            {quote.company && <div><dt className="text-gray-500">Company</dt><dd>{quote.company}</dd></div>}
            <div><dt className="text-gray-500">Submitted</dt><dd>{new Date(quote.createdAt).toLocaleString()}</dd></div>
          </dl>
          <h2 className="font-semibold text-gray-800 mt-6 mb-2">Project Details</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{quote.projectDetails}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {quote.needsSamples && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Needs Samples</span>}
            {quote.needsCADFiles && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Needs CAD Files</span>}
            {quote.hasBidDeadline && <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">Deadline: {quote.deadlineDate ? new Date(quote.deadlineDate).toLocaleDateString() : "N/A"}</span>}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Admin Response</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"><option value="NEW">New</option><option value="REVIEWED">Reviewed</option><option value="REPLIED">Replied</option><option value="CLOSED">Closed</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Add notes about this quote..." /></div>
            <div className="flex gap-2"><button onClick={handleUpdate} className="bg-[--color-brand-accent] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600">Update</button><button onClick={() => router.back()} className="border border-gray-300 px-6 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50">Back</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

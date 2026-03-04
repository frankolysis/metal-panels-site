"use client";

import { useState } from "react";
import type { Metadata } from "next";

export default function RequestQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [hasBidDeadline, setHasBidDeadline] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="bg-green-50 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Thank You!</h1>
            <p className="text-green-700">Your quote request has been submitted successfully. Our team will review it and get back to you shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[--color-brand] mb-4">Request a Quote</h1>
        <p className="text-gray-600 mb-8">Fill out the form below and our team will get back to you with a detailed quote for your project.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input required type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[--color-brand-light] focus:outline-none focus:ring-1 focus:ring-[--color-brand-light]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input required type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[--color-brand-light] focus:outline-none focus:ring-1 focus:ring-[--color-brand-light]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input required type="email" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[--color-brand-light] focus:outline-none focus:ring-1 focus:ring-[--color-brand-light]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input required type="tel" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[--color-brand-light] focus:outline-none focus:ring-1 focus:ring-[--color-brand-light]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[--color-brand-light] focus:outline-none focus:ring-1 focus:ring-[--color-brand-light]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Details *</label>
            <textarea required rows={5} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[--color-brand-light] focus:outline-none focus:ring-1 focus:ring-[--color-brand-light]" placeholder="Describe your project, including desired products, sizes, materials, and any other relevant details." />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-700">I need complimentary samples</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-700">I need CAD files, details, or specifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={hasBidDeadline} onChange={(e) => setHasBidDeadline(e.target.checked)} className="rounded border-gray-300" />
              <span className="text-sm text-gray-700">I have a bid deadline</span>
            </label>
          </div>

          {hasBidDeadline && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline Date *</label>
              <input required type="date" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[--color-brand-light] focus:outline-none focus:ring-1 focus:ring-[--color-brand-light]" />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[--color-brand-accent] text-white py-3 rounded-md font-medium hover:bg-orange-600 transition-colors"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

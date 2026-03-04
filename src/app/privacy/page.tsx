import { SITE_NAME, COMPANY_EMAIL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[--color-brand] mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>{SITE_NAME} is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.</p>
          <h2 className="text-2xl font-bold text-[--color-brand] mt-8 mb-4">Information We Collect</h2>
          <p>We may collect personal information when you request a quote, download resources, or contact us. This includes your name, email address, phone number, and company information.</p>
          <h2 className="text-2xl font-bold text-[--color-brand] mt-8 mb-4">How We Use Your Information</h2>
          <p>Your information is used to respond to inquiries, process quote requests, send relevant communications, and improve our services.</p>
          <h2 className="text-2xl font-bold text-[--color-brand] mt-8 mb-4">Data Protection</h2>
          <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
          <h2 className="text-2xl font-bold text-[--color-brand] mt-8 mb-4">Contact</h2>
          <p>For privacy-related questions, contact us at <a href={"mailto:" + COMPANY_EMAIL} className="text-[--color-brand-light]">{COMPANY_EMAIL}</a>.</p>
        </div>
      </div>
    </div>
  );
}

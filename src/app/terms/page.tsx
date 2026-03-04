import { SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[--color-brand] mb-8">Terms &amp; Conditions</h1>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>Welcome to {SITE_NAME}. By using our website, you agree to the following terms and conditions.</p>
          <h2 className="text-2xl font-bold text-[--color-brand] mt-8 mb-4">Use of Website</h2>
          <p>The content on this website is for general information purposes only. All products shown are representative and may vary in appearance from the final product.</p>
          <h2 className="text-2xl font-bold text-[--color-brand] mt-8 mb-4">Intellectual Property</h2>
          <p>All designs, patterns, and content on this website are the property of {SITE_NAME}. Unauthorized reproduction or distribution is prohibited.</p>
          <h2 className="text-2xl font-bold text-[--color-brand] mt-8 mb-4">Product Information</h2>
          <p>We make every effort to display our products accurately. However, colors and finishes may vary due to screen settings and manufacturing processes.</p>
          <h2 className="text-2xl font-bold text-[--color-brand] mt-8 mb-4">Limitation of Liability</h2>
          <p>{SITE_NAME} shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
        </div>
      </div>
    </div>
  );
}

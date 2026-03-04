import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[--color-brand] mb-8">About {SITE_NAME}</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            {SITE_NAME} panels and systems are designed with artistic value in mind for those who
            strive to improve on the status quo. Each design is a committed expression of our
            designers&apos; creativity.
          </p>

          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-[--color-brand] mb-4">Product Features</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[--color-brand-accent] rounded-full mt-2 shrink-0" />
                <span>Low-maintenance, weather-resistant, durable panels made from steel, corten, or aluminum</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[--color-brand-accent] rounded-full mt-2 shrink-0" />
                <span>Easy installation without costly labor requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[--color-brand-accent] rounded-full mt-2 shrink-0" />
                <span>Recyclable, environmentally-friendly materials</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 mb-6">
            {SITE_NAME} is a solution-focused full-service metal design, engineering and fabrication
            company. Our products are made to order and customizable. We take total ownership of the
            design, engineering and manufacturing process.
          </p>

          <p className="text-gray-700 mb-8">
            We work to eliminate any &quot;gray&quot; area from the process, coordinating with contractors,
            architects, designers, and developers from concept through delivery.
          </p>

          <div className="text-center">
            <Link
              href="/request-quote"
              className="inline-block bg-[--color-brand-accent] text-white px-8 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors"
            >
              Let&apos;s Work Together
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

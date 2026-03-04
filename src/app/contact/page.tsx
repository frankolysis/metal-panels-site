import { SITE_NAME, COMPANY_ADDRESS, COMPANY_CITY, COMPANY_PHONE, COMPANY_PHONE_EXT, COMPANY_EMAIL, SALES_EMAIL, COMPANY_HOURS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[--color-brand] mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">Office Location</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="font-medium">{SITE_NAME}</p>
              <p className="text-gray-600">{COMPANY_ADDRESS}</p>
              <p className="text-gray-600">{COMPANY_CITY}</p>
              <p className="text-gray-600 mt-2">{COMPANY_PHONE}</p>
            </div>

            <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
            <div className="space-y-2">
              {COMPANY_HOURS.map((schedule) => (
                <div key={schedule.days} className="flex justify-between text-gray-600">
                  <span>{schedule.days}</span>
                  <span>{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Sales Department</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="mb-2">
                <span className="text-gray-500">Email: </span>
                <a href={"mailto:" + SALES_EMAIL} className="text-[--color-brand-light] hover:underline">
                  {SALES_EMAIL}
                </a>
              </p>
              <p className="mb-2">
                <span className="text-gray-500">Phone: </span>
                <span>{COMPANY_PHONE} {COMPANY_PHONE_EXT}</span>
              </p>
              <p className="mb-4">
                <span className="text-gray-500">General: </span>
                <a href={"mailto:" + COMPANY_EMAIL} className="text-[--color-brand-light] hover:underline">
                  {COMPANY_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

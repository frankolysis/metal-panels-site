"use client";

import { useState, useMemo, Suspense } from "react";
import { ChevronDown } from "lucide-react";
import SearchInput from "@/components/ui/SearchInput";

const FAQ_DATA = [
  {
    category: "General",
    items: [
      { q: "What does MetalCraft Panels specialize in?", a: "We are a solution-focused full-service metal design, engineering and fabrication company specializing in decorative metal panels and systems." },
      { q: "Where are your products manufactured?", a: "All of our products are designed and manufactured in-house at our facility, ensuring quality control throughout the entire process." },
    ],
  },
  {
    category: "Purchasing",
    items: [
      { q: "How do I purchase products?", a: "Start by requesting a quote through our website or contacting our sales team directly. We will work with you to determine the best solution for your project." },
      { q: "Do you offer volume discounts?", a: "Yes, we offer competitive pricing for larger orders. Contact our sales team to discuss your project requirements and quantities." },
    ],
  },
  {
    category: "Custom",
    items: [
      { q: "Can I create a custom pattern?", a: "Yes, we welcome custom pattern requests. Our design team can work with you to create a unique pattern that meets your vision and project requirements." },
      { q: "What is the process for custom designs?", a: "Submit your design concept through our quote request form. Our team will review it, provide feedback, and work with you to refine the design before production." },
    ],
  },
  {
    category: "Installation",
    items: [
      { q: "Do you provide installation services?", a: "While we do not directly install panels, we provide detailed installation guides and can coordinate with your contractors to ensure proper installation." },
      { q: "Are the panels easy to install?", a: "Yes, our panels are designed for easy installation. They come with pre-drilled mounting holes and we provide comprehensive installation documentation." },
    ],
  },
  {
    category: "Services",
    items: [
      { q: "Do you offer free quotes?", a: "Yes, all quotes are complimentary. Simply fill out our quote request form or contact our sales team to get started." },
      { q: "Can I get samples before ordering?", a: "Absolutely. Check the 'I need complimentary samples' option on our quote request form and we will send you material and finish samples." },
      { q: "Do you provide design assistance?", a: "Yes, our experienced design team is available to help you select the right patterns, materials, and finishes for your project." },
    ],
  },
  {
    category: "Shipping",
    items: [
      { q: "What is the typical lead time?", a: "Lead times vary depending on the complexity and size of the order. Standard products typically ship within 4-6 weeks. Custom orders may require additional time." },
      { q: "How are panels shipped?", a: "Panels are carefully packaged in custom crating to prevent damage during transit. We ship via freight carriers to ensure safe delivery." },
      { q: "What happens if panels are damaged during shipping?", a: "Contact us immediately upon receiving damaged goods. We will work with the shipping carrier to resolve the issue and replace any damaged panels." },
    ],
  },
  {
    category: "Panels",
    items: [
      { q: "How durable are the panels?", a: "Our panels are incredibly durable and resistant to impact, ultra-violet light, moisture, chemicals, and extreme weather conditions." },
      { q: "What finishes are available?", a: "We offer powder coat finishes in a wide range of colors, PVDF finishes for enhanced durability, and natural corten (weathering steel) finishes." },
      { q: "How do I maintain the panels?", a: "Our panels require minimal maintenance. Periodic cleaning with mild soap and water is typically all that is needed to keep them looking their best." },
      { q: "What materials do you work with?", a: "We work primarily with aluminum, steel, and corten (weathering steel). Each material has unique properties suited to different applications." },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-gray-800">{question}</span>
        <ChevronDown className={"shrink-0 ml-2 text-gray-400 transition-transform " + (open ? "rotate-180" : "")} size={20} />
      </button>
      {open && (
        <div className="pb-4 text-gray-600 text-sm">
          {answer}
        </div>
      )}
    </div>
  );
}

function FAQsContent() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return FAQ_DATA;
    const lower = search.toLowerCase();
    return FAQ_DATA.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) => item.q.toLowerCase().includes(lower) || item.a.toLowerCase().includes(lower)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [search]);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[--color-brand] mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8">Find answers to common questions about our products and services.</p>

        <SearchInput value={search} onChange={setSearch} placeholder="Search FAQs..." className="mb-8" />

        <div className="space-y-8">
          {filtered.map((category) => (
            <div key={category.category}>
              <h2 className="text-xl font-bold text-[--color-brand] mb-4">{category.category}</h2>
              <div className="bg-white rounded-lg border border-gray-200 px-6">
                {category.items.map((item) => (
                  <FAQItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">No FAQs found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default function FAQsPage() {
  return (
    <Suspense>
      <FAQsContent />
    </Suspense>
  );
}

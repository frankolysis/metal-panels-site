"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Shapes,
  MessageSquareQuote,
  Mail,
  FileDown,
  Image,
  HelpCircle,
  FileText,
} from "lucide-react";

interface Stats {
  products: number;
  patterns: number;
  quotes: number;
  contacts: number;
  resources: number;
  inspiration: number;
  faqs: number;
  articles: number;
}

const STAT_CARDS = [
  { key: "products" as const, label: "Products", icon: Package, href: "/admin/products", color: "bg-blue-500" },
  { key: "patterns" as const, label: "Patterns", icon: Shapes, href: "/admin/patterns", color: "bg-purple-500" },
  { key: "quotes" as const, label: "Quote Requests", icon: MessageSquareQuote, href: "/admin/quotes", color: "bg-orange-500" },
  { key: "contacts" as const, label: "Contact Messages", icon: Mail, href: "/admin/contacts", color: "bg-green-500" },
  { key: "resources" as const, label: "Resources", icon: FileDown, href: "/admin/resources", color: "bg-cyan-500" },
  { key: "inspiration" as const, label: "Inspiration Projects", icon: Image, href: "/admin/inspiration", color: "bg-pink-500" },
  { key: "faqs" as const, label: "FAQs", icon: HelpCircle, href: "/admin/faqs", color: "bg-yellow-500" },
  { key: "articles" as const, label: "Articles", icon: FileText, href: "/admin/articles", color: "bg-indigo-500" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    products: 0, patterns: 0, quotes: 0, contacts: 0,
    resources: 0, inspiration: 0, faqs: 0, articles: 0,
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={card.color + " p-2 rounded-lg"}>
                <card.icon size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-600">{card.label}</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats[card.key]}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/admin/products/new" className="text-sm text-center bg-gray-50 hover:bg-gray-100 rounded-md p-3 transition-colors">Add Product</Link>
          <Link href="/admin/patterns/new" className="text-sm text-center bg-gray-50 hover:bg-gray-100 rounded-md p-3 transition-colors">Add Pattern</Link>
          <Link href="/admin/quotes" className="text-sm text-center bg-gray-50 hover:bg-gray-100 rounded-md p-3 transition-colors">View Quotes</Link>
          <Link href="/admin/contacts" className="text-sm text-center bg-gray-50 hover:bg-gray-100 rounded-md p-3 transition-colors">View Messages</Link>
        </div>
      </div>
    </div>
  );
}

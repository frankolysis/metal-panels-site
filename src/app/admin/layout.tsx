"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Shapes,
  MessageSquareQuote,
  Mail,
  FileDown,
  Image,
  HelpCircle,
  FileText,
  ArrowLeft,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Patterns", href: "/admin/patterns", icon: Shapes },
  { label: "Quotes", href: "/admin/quotes", icon: MessageSquareQuote },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Resources", href: "/admin/resources", icon: FileDown },
  { label: "Inspiration", href: "/admin/inspiration", icon: Image },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Articles", href: "/admin/articles", icon: FileText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-brand-dark text-white flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <p className="text-xs text-white/60">MetalCraft Panels</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors " +
                  (isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5")
                }
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} /> Back to Site
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div />
            <button
              onClick={() => {
                document.cookie = "next-auth.session-token=; max-age=0; path=/";
                window.location.href = "/admin/login";
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

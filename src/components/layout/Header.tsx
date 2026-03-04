"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Facebook, Instagram, Linkedin } from "lucide-react";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/patterns", label: "Patterns" },
  { href: "/inspiration", label: "Inspiration" },
  { href: "/request-quote", label: "Request Quote" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
];

const secondaryLinks = [
  { href: "/articles", label: "Articles" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex gap-4">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-[--color-brand]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[--color-brand]">
                <Facebook size={16} />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[--color-brand]">
                <Instagram size={16} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[--color-brand]">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[--color-brand] font-[family-name:var(--font-heading)]">
            {SITE_NAME}
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[--color-brand-accent] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2" />
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-md text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

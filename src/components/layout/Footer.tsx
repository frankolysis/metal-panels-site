import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import {
  SITE_NAME,
  COMPANY_ADDRESS,
  COMPANY_CITY,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  SOCIAL_LINKS,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{SITE_NAME}</h3>
            <p className="text-gray-300 text-sm">
              A solution-focused full-service metal design, engineering and
              fabrication company.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/products" className="hover:text-white">All Products</Link></li>
              <li><Link href="/patterns" className="hover:text-white">Patterns</Link></li>
              <li><Link href="/inspiration" className="hover:text-white">Inspiration</Link></li>
              <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/faqs" className="hover:text-white">FAQs</Link></li>
              <li><Link href="/articles" className="hover:text-white">Articles</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{COMPANY_ADDRESS}</p>
              <p>{COMPANY_CITY}</p>
              <p>{COMPANY_PHONE}</p>
              <p>
                <a href={"mailto:" + COMPANY_EMAIL} className="hover:text-white">
                  {COMPANY_EMAIL}
                </a>
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

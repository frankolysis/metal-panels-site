import Link from "next/link";
import type { Metadata } from "next";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = { title: "Articles" };

const SAMPLE_ARTICLES = [
  { title: "The Rise of Decorative Metal in Modern Architecture", date: "2024-12-01", excerpt: "Exploring how decorative metal panels are transforming contemporary building design.", category: "Architectural Design" },
  { title: "Choosing the Right Material for Your Metal Panel Project", date: "2024-11-15", excerpt: "A comprehensive guide to aluminum, steel, and corten for decorative applications.", category: "Technical" },
  { title: "Sustainability in Metal Fabrication", date: "2024-10-20", excerpt: "How recyclable materials and efficient processes make metal panels an eco-friendly choice.", category: "Sustainability" },
  { title: "5 Inspiring Commercial Facade Projects", date: "2024-09-10", excerpt: "Showcasing stunning commercial buildings transformed with decorative metal panels.", category: "Inspiration" },
  { title: "Understanding Powder Coat vs PVDF Finishes", date: "2024-08-25", excerpt: "Comparing the two most popular finish options for decorative metal panels.", category: "Technical" },
  { title: "New Pattern Collection: Nature Series", date: "2024-07-15", excerpt: "Introducing our latest pattern collection inspired by organic forms found in nature.", category: "New Products" },
];

export default function ArticlesPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[--color-brand] mb-4">Articles</h1>
        <p className="text-gray-600 mb-12">News, insights, and updates from our team.</p>

        <div className="space-y-8">
          {SAMPLE_ARTICLES.map((article) => (
            <Link
              key={article.title}
              href={"/articles/" + slugify(article.title)}
              className="block group"
            >
              <article className="flex gap-6 items-start bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-32 h-24 bg-gradient-to-br from-[--color-brand] to-[--color-brand-dark] rounded-md shrink-0 flex items-center justify-center">
                  <span className="text-white/30 text-3xl font-bold">{article.title.charAt(0)}</span>
                </div>
                <div>
                  <span className="text-xs font-medium text-[--color-brand-accent]">{article.category}</span>
                  <h2 className="text-lg font-semibold text-[--color-brand] group-hover:text-[--color-brand-accent] transition-colors mt-1">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{article.excerpt}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

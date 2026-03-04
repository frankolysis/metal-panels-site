import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand mb-4">Products</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Explore our full range of decorative metal panel solutions, from architectural screens to custom enclosures.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={"/products/" + slugify(category)}
              className="group block"
            >
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-[4/3] bg-gradient-to-br from-brand to-brand-dark relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold">
                    {category.charAt(0)}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-brand group-hover:text-brand-accent transition-colors">
                    {category}
                  </h2>
                  <p className="text-sm text-brand-accent mt-1 group-hover:underline">
                    View Product &rarr;
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

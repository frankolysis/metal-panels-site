import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((cat) => ({ slug: slugify(cat) }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = PRODUCT_CATEGORIES.find((c) => slugify(c) === slug);
  if (!category) notFound();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm mb-8">
          <Link href="/products" className="text-brand-light hover:underline">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-[4/3] bg-gradient-to-br from-brand to-brand-dark rounded-lg flex items-center justify-center">
            <span className="text-white/20 text-9xl font-bold">{category.charAt(0)}</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-brand mb-4">{category}</h1>
            <p className="text-gray-600 mb-6">
              Our {category.toLowerCase()} are designed with artistic value in mind, combining
              functionality with stunning visual appeal. Each product is made to order and fully
              customizable to meet your project specifications.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 shrink-0" />
                  Weather-resistant and durable construction
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 shrink-0" />
                  Available in steel, aluminum, and corten
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 shrink-0" />
                  Custom sizes and finishes available
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 shrink-0" />
                  Multiple pattern options
                </li>
              </ul>
            </div>

            <Link
              href="/request-quote"
              className="inline-block bg-brand-accent text-white px-8 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

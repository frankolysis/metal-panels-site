import Link from "next/link";
import { notFound } from "next/navigation";
import { slugify } from "@/lib/utils";

const SAMPLE_PATTERNS = [
  "Cascade", "Turbulence", "Mosaic", "Honeycomb", "Wave", "Lattice",
  "Geometric", "Organic", "Ripple", "Woven", "Crosshatch", "Diamond",
  "Floral", "Abstract", "Linear", "Radial", "Pixel", "Fractal",
  "Bamboo", "Coral", "Fern", "Ivy", "Pebble", "Terrain",
  "Skyline", "Aurora", "Glacier", "Canyon", "Dune", "Reef",
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SAMPLE_PATTERNS.map((p) => ({ slug: slugify(p) }));
}

export default async function PatternDetailPage({ params }: Props) {
  const { slug } = await params;
  const pattern = SAMPLE_PATTERNS.find((p) => slugify(p) === slug);
  if (!pattern) notFound();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm mb-8">
          <Link href="/patterns" className="text-brand-light hover:underline">Patterns</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{pattern}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-9xl text-gray-300 font-bold">{pattern.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-brand mb-4">{pattern}</h1>
            <p className="text-gray-600 mb-6">
              The {pattern} pattern is a laser-cut design available in multiple sizes and materials.
              Like all our patterns, it can be scaled and modified to suit your specific project needs.
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Available Sizes</h3>
                <p className="text-gray-700">24&quot; x 36&quot;, 48&quot; x 96&quot;, 96&quot; x 48&quot;</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Materials</h3>
                <p className="text-gray-700">Aluminum, Cor-Ten Steel</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Finishes</h3>
                <p className="text-gray-700">Powder Coat, PVDF, Natural Corten</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/request-quote" className="bg-brand-accent text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors">
                Request a Quote
              </Link>
              <Link href="/inspiration" className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                See Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

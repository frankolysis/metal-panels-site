import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-[--color-brand-dark]">
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-brand-dark] via-[--color-brand] to-[--color-brand-dark] opacity-90" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-[family-name:var(--font-heading)]">
            {SITE_TAGLINE}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Decorative metal panels engineered for beauty, built for durability
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/request-quote"
              className="bg-[--color-brand-accent] text-white px-8 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/products"
              className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[--color-brand]">Why Choose {SITE_NAME}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Durable & Weather-Resistant", desc: "Low-maintenance panels made from steel, corten, or aluminum that withstand the elements." },
              { title: "Easy Installation", desc: "Designed for simple installation without costly specialized labor requirements." },
              { title: "Eco-Friendly Materials", desc: "Recyclable, environmentally-friendly materials that minimize environmental impact." },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="w-16 h-16 bg-[--color-brand-accent]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-[--color-brand-accent] rounded-full" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Preview */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-[--color-brand]">Our Products</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            From architectural screens to railing systems, we offer a complete range of decorative metal solutions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Architectural Metal Screens", "Sunshades & Louvers", "Railing Systems",
              "Metal Gates", "Fence Toppers", "Metal Enclosures",
              "Juliet Balconies", "Bike Racks",
            ].map((product) => (
              <Link
                key={product}
                href="/products"
                className="group relative aspect-[4/3] bg-[--color-brand] rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium text-sm group-hover:text-[--color-brand-accent] transition-colors">
                    {product}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-block bg-[--color-brand] text-white px-8 py-3 rounded-md font-medium hover:bg-[--color-brand-dark] transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[--color-brand-accent]">
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-lg mb-8 opacity-90">
            Let us help you find the perfect metal panel solution for your project.
          </p>
          <Link
            href="/request-quote"
            className="inline-block bg-white text-[--color-brand-accent] px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}

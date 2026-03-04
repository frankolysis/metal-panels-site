import Link from "next/link";
import { notFound } from "next/navigation";
import { slugify } from "@/lib/utils";

const SAMPLE_ARTICLES = [
  { title: "The Rise of Decorative Metal in Modern Architecture", date: "2024-12-01", category: "Architectural Design", content: "Decorative metal panels have become increasingly popular in modern architecture, offering architects and designers a versatile medium for creating stunning visual effects while maintaining structural integrity. From commercial facades to residential accents, metal panels provide unlimited creative possibilities.\n\nThe trend towards incorporating decorative metal elements in building design reflects a broader movement toward materials that combine aesthetic appeal with practical functionality. Metal panels offer durability, weather resistance, and minimal maintenance requirements, making them an ideal choice for both interior and exterior applications." },
  { title: "Choosing the Right Material for Your Metal Panel Project", date: "2024-11-15", category: "Technical", content: "When selecting materials for a decorative metal panel project, three primary options stand out: aluminum, steel, and corten (weathering steel). Each material brings unique properties that make it suitable for different applications and environments.\n\nAluminum is lightweight, corrosion-resistant, and ideal for interior applications and coastal environments. Steel offers superior strength and is perfect for structural applications. Corten develops a beautiful natural rust patina over time, making it a popular choice for architectural features that evolve with their environment." },
  { title: "Sustainability in Metal Fabrication", date: "2024-10-20", category: "Sustainability", content: "Metal panels represent one of the most sustainable building material options available today. Both aluminum and steel are fully recyclable, and modern fabrication processes are designed to minimize waste and energy consumption.\n\nOur commitment to sustainability extends beyond the materials themselves. We optimize our cutting patterns to reduce material waste, use energy-efficient equipment, and continuously improve our processes to minimize our environmental footprint." },
  { title: "5 Inspiring Commercial Facade Projects", date: "2024-09-10", category: "Inspiration", content: "Commercial facades serve as the first impression of any business, and decorative metal panels offer unlimited possibilities for creating memorable and distinctive building exteriors.\n\nFrom perforated screens that create dynamic light and shadow patterns to laser-cut designs that tell a story, metal panel facades transform ordinary buildings into architectural landmarks." },
  { title: "Understanding Powder Coat vs PVDF Finishes", date: "2024-08-25", category: "Technical", content: "Choosing the right finish for your metal panels is just as important as selecting the right material. The two most popular finish options are powder coat and PVDF (Polyvinylidene Fluoride), each offering distinct advantages.\n\nPowder coat provides excellent color consistency and durability, with a wide range of colors and textures available. PVDF finishes offer superior UV resistance and color retention, making them ideal for exterior applications in harsh environments." },
  { title: "New Pattern Collection: Nature Series", date: "2024-07-15", category: "New Products", content: "We are excited to introduce our latest pattern collection, inspired by the organic forms and textures found in nature. The Nature Series includes patterns inspired by flowing water, tree canopies, coral reefs, and geological formations.\n\nEach pattern in the collection has been carefully designed to capture the essence of natural beauty while maintaining the precision and consistency that our laser-cutting technology provides." },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SAMPLE_ARTICLES.map((a) => ({ slug: slugify(a.title) }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = SAMPLE_ARTICLES.find((a) => slugify(a.title) === slug);
  if (!article) notFound();

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav className="text-sm mb-8">
          <Link href="/articles" className="text-[--color-brand-light] hover:underline">Articles</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{article.category}</span>
        </nav>

        <article>
          <span className="text-sm font-medium text-[--color-brand-accent]">{article.category}</span>
          <h1 className="text-3xl font-bold text-[--color-brand] mt-2 mb-4">{article.title}</h1>
          <p className="text-gray-500 text-sm mb-8">{new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          <div className="prose prose-lg max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-gray-700 mb-4">{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="mt-12 pt-8 border-t">
          <Link href="/articles" className="text-[--color-brand-light] hover:underline">&larr; Back to Articles</Link>
        </div>
      </div>
    </div>
  );
}

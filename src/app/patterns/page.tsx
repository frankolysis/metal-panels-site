"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import SearchInput from "@/components/ui/SearchInput";
import { slugify } from "@/lib/utils";

const SAMPLE_PATTERNS = [
  "Cascade", "Turbulence", "Mosaic", "Honeycomb", "Wave", "Lattice",
  "Geometric", "Organic", "Ripple", "Woven", "Crosshatch", "Diamond",
  "Floral", "Abstract", "Linear", "Radial", "Pixel", "Fractal",
  "Bamboo", "Coral", "Fern", "Ivy", "Pebble", "Terrain",
  "Skyline", "Aurora", "Glacier", "Canyon", "Dune", "Reef",
];

const SIZES = ["24x36", "48x96", "96x48"];
const MATERIALS = ["Aluminum", "Cor-Ten Steel"];

function PatternsContent() {
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("az");

  const filtered = useMemo(() => {
    let items = [...SAMPLE_PATTERNS];
    if (search) items = items.filter((p) => p.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === "az") items.sort();
    if (sortBy === "za") items.sort().reverse();
    return items;
  }, [search, sortBy]);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[--color-brand] mb-4">Patterns</h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Browse our library of laser-cut patterns. Patterns are designed in a 10&apos;x10&apos; format
          and may be scaled and modified to achieve any custom size.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-end">
          <SearchInput value={search} onChange={setSearch} placeholder="Search patterns..." className="w-64" />
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All Sizes</option>
            {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All Materials</option>
            {MATERIALS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((pattern) => (
            <Link
              key={pattern}
              href={"/patterns/" + slugify(pattern)}
              className="group block"
            >
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-4xl text-gray-300 font-bold">{pattern.charAt(0)}</span>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 group-hover:text-[--color-brand-accent] transition-colors">
                    {pattern}
                  </h3>
                  <p className="text-xs text-[--color-brand-accent] mt-1">View Pattern &rarr;</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">No patterns found matching your criteria.</p>
        )}

        <p className="text-sm text-gray-500 mt-8">
          Note: Computer generated colors are only close approximations of how the colors will appear in real life.
          CAD, SketchUp, and BIM file formats are available through the Resources page.
        </p>
      </div>
    </div>
  );
}

export default function PatternsPage() {
  return (
    <Suspense>
      <PatternsContent />
    </Suspense>
  );
}

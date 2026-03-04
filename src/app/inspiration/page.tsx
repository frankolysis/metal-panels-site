"use client";

import { useState, useMemo, Suspense } from "react";
import SearchInput from "@/components/ui/SearchInput";

const SAMPLE_PROJECTS = [
  { title: "Downtown Commercial Tower", location: "Portland, OR", type: "Commercial", pattern: "Cascade", material: "Aluminum", finish: "Powder Coat - Matte Black", architect: "Smith & Associates" },
  { title: "Riverside Apartments", location: "Seattle, WA", type: "Residential", pattern: "Wave", material: "Steel", finish: "PVDF - Silver", architect: "Modern Living Design" },
  { title: "City Library Expansion", location: "Denver, CO", type: "Education", pattern: "Mosaic", material: "Corten", finish: "Natural Rust", architect: "Public Works Studio" },
  { title: "Boutique Hotel Lobby", location: "San Francisco, CA", type: "Hospitality", pattern: "Honeycomb", material: "Aluminum", finish: "Powder Coat - Gold", architect: "Luxe Interiors" },
  { title: "Community Health Center", location: "Austin, TX", type: "Healthcare", pattern: "Organic", material: "Steel", finish: "Powder Coat - White", architect: "Wellness Architecture" },
  { title: "Retail Plaza Facade", location: "Phoenix, AZ", type: "Retail", pattern: "Geometric", material: "Aluminum", finish: "PVDF - Bronze", architect: "Urban Design Group" },
  { title: "Park Pavilion", location: "Chicago, IL", type: "Public Spaces", pattern: "Lattice", material: "Steel", finish: "Powder Coat - Green", architect: "Parks & Recreation Dept" },
  { title: "Mixed-Use Development", location: "Nashville, TN", type: "Mixed Use", pattern: "Turbulence", material: "Corten", finish: "Natural Rust", architect: "New South Design" },
];

const PROJECT_TYPES = ["Commercial", "Residential", "Education", "Hospitality", "Healthcare", "Retail", "Public Spaces", "Mixed Use"];

function InspirationContent() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");

  const filtered = useMemo(() => {
    let items = [...SAMPLE_PROJECTS];
    if (search) items = items.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.pattern.toLowerCase().includes(search.toLowerCase()));
    if (selectedType) items = items.filter((p) => p.type === selectedType);
    return items;
  }, [search, selectedType]);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand mb-4">Inspiration Gallery</h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Explore real-world installations of our decorative metal panels across residential, commercial, and public projects.
        </p>

        <div className="flex flex-wrap gap-4 mb-8 items-end">
          <SearchInput value={search} onChange={setSearch} placeholder="Search projects..." className="w-64" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">All Project Types</option>
            {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div key={project.title} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center">
                <span className="text-white/20 text-6xl font-bold">{project.title.charAt(0)}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-brand mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{project.location}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p><span className="font-medium">Pattern:</span> {project.pattern}</p>
                  <p><span className="font-medium">Material:</span> {project.material}</p>
                  <p><span className="font-medium">Finish:</span> {project.finish}</p>
                  <p><span className="font-medium">Architect:</span> {project.architect}</p>
                  <p><span className="font-medium">Type:</span> {project.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">No projects found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default function InspirationPage() {
  return (
    <Suspense>
      <InspirationContent />
    </Suspense>
  );
}

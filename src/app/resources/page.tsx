"use client";

import { useState, useMemo, Suspense } from "react";
import { Download } from "lucide-react";
import SearchInput from "@/components/ui/SearchInput";
import { RESOURCE_CATEGORIES } from "@/lib/constants";

const SAMPLE_RESOURCES = [
  { title: "Architectural Flyer", category: "Marketing", fileType: "PDF", fileSize: "2.4 MB" },
  { title: "Facade Flyer", category: "Marketing", fileType: "PDF", fileSize: "1.8 MB" },
  { title: "Landscape Architecture Flyer", category: "Marketing", fileType: "PDF", fileSize: "2.1 MB" },
  { title: "Interior Design Flyer", category: "Marketing", fileType: "PDF", fileSize: "1.9 MB" },
  { title: "Railing Flyer", category: "Marketing", fileType: "PDF", fileSize: "1.5 MB" },
  { title: "Corten Finish Specifications", category: "Specifications", fileType: "PDF", fileSize: "0.8 MB" },
  { title: "Powder Coat Specifications", category: "Specifications", fileType: "PDF", fileSize: "0.9 MB" },
  { title: "PVDF Finish Specifications", category: "Specifications", fileType: "PDF", fileSize: "0.7 MB" },
  { title: "Panel Specifications", category: "Specifications", fileType: "PDF", fileSize: "1.2 MB" },
  { title: "Facade Panel System", category: "Standard Product", fileType: "PDF", fileSize: "3.1 MB" },
  { title: "Fencing System", category: "Standard Product", fileType: "PDF", fileSize: "2.8 MB" },
  { title: "Railing System", category: "Standard Product", fileType: "PDF", fileSize: "2.5 MB" },
  { title: "Sunshade System", category: "Standard Product", fileType: "PDF", fileSize: "2.9 MB" },
  { title: "General Catalog", category: "Technical Info", fileType: "PDF", fileSize: "8.5 MB" },
  { title: "Technical Flyer", category: "Technical Info", fileType: "PDF", fileSize: "1.6 MB" },
  { title: "Weights & Openness Guide", category: "Technical Info", fileType: "PDF", fileSize: "2.2 MB" },
  { title: "CAD Pattern Library", category: "Technical Info", fileType: "DWG", fileSize: "15.0 MB" },
  { title: "SketchUp Pattern Library", category: "Technical Info", fileType: "SKP", fileSize: "12.0 MB" },
  { title: "Sustainability White Paper", category: "White Papers", fileType: "PDF", fileSize: "1.1 MB" },
  { title: "Material Comparison Guide", category: "White Papers", fileType: "PDF", fileSize: "0.9 MB" },
];

function ResourcesContent() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [emailGateOpen, setEmailGateOpen] = useState(false);
  const [email, setEmail] = useState("");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = useMemo(() => {
    let items = [...SAMPLE_RESOURCES];
    if (search) items = items.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategories.length > 0) items = items.filter((r) => selectedCategories.includes(r.category));
    return items;
  }, [search, selectedCategories]);

  const handleDownload = () => {
    const savedEmail = typeof window !== "undefined" ? document.cookie.split("; ").find((c) => c.startsWith("resource_email=")) : null;
    if (savedEmail) {
      alert("Download would start here (placeholder)");
    } else {
      setEmailGateOpen(true);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      document.cookie = "resource_email=" + email + ";max-age=" + (365 * 24 * 60 * 60) + ";path=/";
      setEmailGateOpen(false);
      alert("Download would start here (placeholder)");
    }
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand mb-4">Resources</h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Download marketing materials, specifications, CAD libraries, and technical documents.
        </p>

        <div className="flex flex-wrap gap-4 mb-8 items-start">
          <SearchInput value={search} onChange={setSearch} placeholder="Search resources..." className="w-64" />
          <div className="flex flex-wrap gap-2">
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={"px-3 py-1.5 rounded-full text-sm border transition-colors " +
                  (selectedCategories.includes(cat)
                    ? "bg-brand text-white border-brand"
                    : "bg-white text-gray-600 border-gray-300 hover:border-brand"
                  )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((resource) => (
            <div key={resource.title} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-brand-accent bg-orange-50 px-2 py-0.5 rounded">
                  {resource.category}
                </span>
                <span className="text-xs text-gray-400">{resource.fileType}</span>
              </div>
              <h3 className="font-medium text-gray-800 text-sm mb-1">{resource.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{resource.fileSize}</p>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 text-sm text-brand-light hover:text-brand transition-colors"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">No resources found matching your criteria.</p>
        )}

        {/* Email Gate Modal */}
        {emailGateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-2">Enter Your Email to Download</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please provide your email address to access our resource library.
              </p>
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm mb-4 focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-brand-accent text-white py-2 rounded-md text-sm font-medium hover:bg-orange-600">
                    Download
                  </button>
                  <button type="button" onClick={() => setEmailGateOpen(false)} className="flex-1 border border-gray-300 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense>
      <ResourcesContent />
    </Suspense>
  );
}

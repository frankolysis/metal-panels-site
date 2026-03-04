"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Star, MapPin } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface ProjectImage {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
}

interface InspirationProject {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  location: string | null;
  projectType: string;
  isFeatured: boolean;
  isActive: boolean;
  images: ProjectImage[];
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  COMMERCIAL: "Commercial",
  HOSPITALITY: "Hospitality",
  RESIDENTIAL: "Residential",
  RETAIL: "Retail",
  PUBLIC_SPACES: "Public Spaces",
  HEALTHCARE: "Healthcare",
  EDUCATION: "Education",
  MIXED_USE: "Mixed Use",
};

export default function AdminInspirationPage() {
  const [projects, setProjects] = useState<InspirationProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/inspiration?all=true")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inspiration project? This action cannot be undone."))
      return;
    const res = await fetch("/api/inspiration/" + id, { method: "DELETE" });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Inspiration Projects
        </h1>
        <Link
          href="/admin/inspiration/new"
          className="flex items-center gap-2 bg-[--color-brand-accent] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
        >
          <Plus size={16} /> Add Project
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
          No inspiration projects yet. Click &quot;Add Project&quot; to create
          one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const featuredImage = project.images?.[0];
            return (
              <div
                key={project.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image area */}
                <div className="relative aspect-[4/3] bg-gray-100">
                  {featuredImage ? (
                    <Image
                      src={featuredImage.url}
                      alt={featuredImage.alt || project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  {/* Status badges overlaid on image */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {project.isFeatured && (
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> Featured
                      </span>
                    )}
                    <Badge variant={project.isActive ? "success" : "default"}>
                      {project.isActive ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {project.title}
                    </h3>
                    <Badge variant="info">
                      {PROJECT_TYPE_LABELS[project.projectType] ||
                        project.projectType}
                    </Badge>
                  </div>

                  {project.location && (
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                      <MapPin size={12} /> {project.location}
                    </p>
                  )}

                  {project.description && (
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <Link
                      href={"/admin/inspiration/" + project.id + "/edit"}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-[--color-brand] transition-colors"
                    >
                      <Edit size={14} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors ml-auto"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

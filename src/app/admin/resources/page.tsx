"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, FileDown, FileText, File } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileType: string | null;
  fileSize: string | null;
  isActive: boolean;
  category: { id: string; name: string } | null;
  _count: { downloads: number };
}

const FILE_TYPE_ICONS: Record<string, typeof FileText> = {
  PDF: FileText,
  DWG: File,
  SPEC: File,
  IMAGE: File,
  OTHER: File,
};

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resources?all=true")
      .then((r) => r.json())
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this resource? This action cannot be undone.")) return;
    const res = await fetch("/api/resources/" + id, { method: "DELETE" });
    if (res.ok) {
      setResources((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const getFileTypeIcon = (fileType: string | null) => {
    const Icon = FILE_TYPE_ICONS[fileType || "OTHER"] || File;
    return <Icon size={16} className="text-gray-400" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Resources</h1>
        <Link
          href="/admin/resources/new"
          className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600"
        >
          <Plus size={16} /> Add Resource
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Title
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                File Type
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Downloads
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Loading resources...
                </td>
              </tr>
            ) : resources.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No resources yet. Click &quot;Add Resource&quot; to create one.
                </td>
              </tr>
            ) : (
              resources.map((resource) => (
                <tr key={resource.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getFileTypeIcon(resource.fileType)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {resource.title}
                        </div>
                        {resource.fileSize && (
                          <div className="text-xs text-gray-400">
                            {resource.fileSize}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {resource.category?.name || "-"}
                  </td>
                  <td className="px-4 py-3">
                    {resource.fileType ? (
                      <Badge variant="info">{resource.fileType}</Badge>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FileDown size={14} />
                      {resource._count.downloads}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={resource.isActive ? "success" : "default"}>
                      {resource.isActive ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={"/admin/resources/" + resource.id + "/edit"}
                      className="text-gray-400 hover:text-brand inline-block mr-2"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(resource.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

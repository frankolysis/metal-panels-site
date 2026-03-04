"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: { name: string };
  isActive: boolean;
  isFeatured: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then(setProducts).catch(() => {});
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/products/" + id, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600">
          <Plus size={16} /> Add Product
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Category</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Featured</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{product.category?.name || "-"}</td>
                <td className="px-4 py-3"><span className={"text-xs px-2 py-0.5 rounded-full " + (product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>{product.isActive ? "Active" : "Inactive"}</span></td>
                <td className="px-4 py-3 text-sm">{product.isFeatured ? "Yes" : "-"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={"/admin/products/" + product.id + "/edit"} className="text-gray-400 hover:text-brand inline-block mr-2"><Edit size={16} /></Link>
                  <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No products yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

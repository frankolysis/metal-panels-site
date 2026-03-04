import { z } from "zod";

export const productCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  sortOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  features: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export type ProductCategoryFormData = z.infer<typeof productCategorySchema>;
export type ProductFormData = z.infer<typeof productSchema>;

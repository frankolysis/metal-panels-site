import { z } from "zod";

export const patternSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  sizes: z.array(z.string()).default([]),
  materials: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export type PatternFormData = z.infer<typeof patternSchema>;

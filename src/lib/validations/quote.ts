import { z } from "zod";

export const quoteSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    company: z.string().optional(),
    projectDetails: z.string().min(10, "Please describe your project"),
    needsSamples: z.boolean().default(false),
    needsCADFiles: z.boolean().default(false),
    hasBidDeadline: z.boolean().default(false),
    deadlineDate: z.string().optional(),
  })
  .refine(
    (data) => !data.hasBidDeadline || (data.deadlineDate && data.deadlineDate.length > 0),
    {
      message: "Deadline date is required when you have a bid deadline",
      path: ["deadlineDate"],
    }
  );

export type QuoteFormData = z.infer<typeof quoteSchema>;

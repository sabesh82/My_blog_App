import { z } from "zod";

const BlogSchema = z.object({
  title: z
    .string({ required_error: "tile is required" })
    .min(2, { message: "title must be atleast 2 characters" })
    .max(150, { message: "title do not exceed 150 characters" })
    .trim()
    .regex(/^[a-zA-Z\s-]+$/, { message: "can only have a-z , A-Z ,space , -" }),

  slug: z
    .string({ required_error: "slug is required" })
    .min(2, { message: "slug must be atleast 2 characters" })
    .max(300, { message: "slug do not exceed 150 characters" })
    .toLowerCase()
    .regex(/^[a-z0-9-\s]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    })
    .refine((val) => !val.startsWith("-") && !val.endsWith("-"), {
      message: "Slug cannot start or end with a hyphen",
    })
    .refine((val) => !val.includes("--"), {
      message: "Slug cannot contain consecutive hyphens",
    }),

  content: z
    .string({ required_error: "content is required" })
    .min(2, { message: "content must be atleast 2 characters" })
    .max(10000, { message: "content do not exceed 10000 characters" })
    .trim()
    .refine((val) => val.split(/\s+/).length >= 10, {
      message: "Content must contain at least 10 words",
    }),
});

const BlogPaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "page should be positive number",
    }),

  size: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 25))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "size should be positive number",
    }),
  search: z.string().optional(),
});

export { BlogSchema, BlogPaginationSchema };

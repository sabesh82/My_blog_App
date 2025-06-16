import { NextRequest } from "next/server";
import { z, ZodType } from "zod";

type PaginationParams = {
  page: number;
  size: number;
};

type PaginationSchema = ZodType<PaginationParams>;

const defaultPaginationSchema = z.object({
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
});

type PaginationParamsOptions = {
  request: NextRequest;
  pageKey?: string;
  sizeKey?: string;
  schema?: PaginationSchema;
};

export default function getPaginationParams({
  request,
  pageKey = "page",
  sizeKey = "size",
  schema,
}: PaginationParamsOptions): PaginationParams {
  const rawParams = {
    page: request.nextUrl.searchParams.get(pageKey) || undefined,
    size: request.nextUrl.searchParams.get(sizeKey) || undefined,
  };

  const schemaToBeUsed = schema ?? defaultPaginationSchema;
  const validatedParams = schemaToBeUsed.parse(rawParams);

  return validatedParams;
}

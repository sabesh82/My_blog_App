import { NextRequest } from "next/server";
import { z, ZodType } from "zod";

type SearchParams = {
  search?: string;
};

type SearchSchema = ZodType<SearchParams>;

const defaultSearchSchema = z.object({
  search: z.string().optional(),
});

type getSearchParamsOptions = {
  request: NextRequest;
  schema?: SearchSchema;
  searchKey?: string;
};

export default function getSearchParams({
  request,
  schema,
  searchKey = "search",
}: getSearchParamsOptions): SearchParams {
  const rawParams = {
    search: request.nextUrl.searchParams.get(searchKey) || undefined,
  };

  const schemaToBeUsed = schema ?? defaultSearchSchema;
  const validatedParams = schemaToBeUsed.parse(rawParams);

  return validatedParams;
}

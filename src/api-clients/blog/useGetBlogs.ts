import { getBlogParam } from "@/app/api/blog/types";
import { useApi } from "@/providers/apiProvider";
import { Blog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useGetBlogs(params: getBlogParam) {
  const { apiClient } = useApi();

  type BlogWithAuthor = Blog & {
    Author?: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };

  const getBlogsFn = async (): Promise<{
    items: BlogWithAuthor[];
    count: number;
    search: string;
  }> => {
    return await (
      await apiClient.get("blog", {
        params,
      })
    ).data;
  };

  return useQuery({
    queryKey: ["get-blogs", params],
    queryFn: getBlogsFn,
  });
}

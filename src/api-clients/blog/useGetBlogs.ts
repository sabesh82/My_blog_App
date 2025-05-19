import { getBlogParam } from "@/app/api/blog/types";
import api from "@/app/api/helpers/baseApi";
import { useApi } from "@/providers/apiProvider";
import { Blog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useGetBlogs(params: getBlogParam) {
  const { apiClient } = useApi();
  const getBlogsFn = async (): Promise<{
    items: Blog[];
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

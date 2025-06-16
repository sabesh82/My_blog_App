import { BlogInput } from "@/app/api/blog/types";
import queryClient from "@/app/api/helpers/QueryClient";
import { useApi } from "@/providers/apiProvider";
import { Blog } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export const useCreateBlog = () => {
  const { apiClient } = useApi();

  const createBlogFn = async (values: BlogInput): Promise<Blog> => {
    return await apiClient.post("blog", values);
  };

  return useMutation({
    mutationFn: createBlogFn,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-blogs"],
      });
    },
  });
};

import { BlogInput } from "@/app/api/blog/types";
import queryClient from "@/app/api/helpers/QueryClient";
import { cookieKeys } from "@/config/cookies.config";
import { useApi } from "@/providers/apiProvider";
import { Blog } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import Cookie from "js-cookie";

export const useCreateBlog = () => {
  const { apiClient } = useApi();

  const createBlogFn = async (values: BlogInput): Promise<Blog> => {
    const token = Cookie.get(cookieKeys.USER_TOKEN);
    console.log("TOKEN USED:", token);
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

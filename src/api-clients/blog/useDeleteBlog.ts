import { useApi } from "@/providers/apiProvider";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/app/api/helpers/QueryClient";

export const useDeleteBlog = () => {
  const { apiClient } = useApi();

  return useMutation({
    mutationFn: async (id: string) => {
      return await apiClient.delete(`blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-blogs"],
      });
    },
  });
};

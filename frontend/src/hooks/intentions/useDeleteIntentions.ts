import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIntention } from "@/src/services/intentions.service";

export function useDeleteIntention() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIntention,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intentions"] });
    },
  });
}

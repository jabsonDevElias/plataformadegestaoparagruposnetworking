import { useQuery } from "@tanstack/react-query";
import { getIntention } from "@/src/services/intentions.service";

export function useGetIntention(id?: number) {
  return useQuery({
    queryKey: ["intentions", id],
    queryFn: () => getIntention(id!),
    enabled: !!id,
  });
}

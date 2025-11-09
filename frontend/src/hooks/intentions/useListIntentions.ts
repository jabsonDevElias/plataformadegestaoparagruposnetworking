"use client";

import { useQuery } from "@tanstack/react-query";
import { listIntentions } from "../../services/intentions.service";

export function useIntentios() {
  return useQuery({
    queryKey: ["listintentions"],
    queryFn: listIntentions
  });
}


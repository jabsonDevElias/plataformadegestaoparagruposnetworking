"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth(redirectTo?: string) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (redirectTo) router.push(redirectTo);
    }

    setIsLoading(false);
  }, [redirectTo, router]);

  return { isAuthenticated, isLoading };
}

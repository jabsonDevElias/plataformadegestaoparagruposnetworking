"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number; // timestamp em segundos
  [key: string]: any;
}

export function useAuth(redirectTo?: string) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Math.floor(Date.now() / 1000); // timestamp atual em segundos

        if (decoded.exp && decoded.exp > now) {
          setIsAuthenticated(true); // token válido
        } else {
          // token expirou
          localStorage.removeItem("authToken");
          setIsAuthenticated(false);
          if (redirectTo) router.push(redirectTo);
        }
      } catch (err) {
        // token inválido
        console.error("Token inválido:", err);
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        if (redirectTo) router.push(redirectTo);
      }
    } else {
      setIsAuthenticated(false);
      if (redirectTo) router.push(redirectTo);
    }

    setIsLoading(false);
  }, [redirectTo, router]);

  return { isAuthenticated, isLoading };
}

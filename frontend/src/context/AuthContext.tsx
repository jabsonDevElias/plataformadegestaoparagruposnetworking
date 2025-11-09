"use client";

import { createContext, useContext, useState, useEffect } from "react";

type AuthContextProps = {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  token: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

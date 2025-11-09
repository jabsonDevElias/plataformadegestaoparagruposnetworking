import api from "@/src/services/api";

export async function signIn(payload: { email: string; password: string }) {
  const { data } = await api.post("/login", payload);

  const token = data.token;
  localStorage.setItem("authToken", token);

  return data;
}

export async function signOut(payload: { email: string; password: string }) {
  const { data } = await api.post("/api/login", payload);
  return data;
}

import api from "@/src/services/api";

export async function listIntentions() {
  const { data } = await api.get("/listintentions");
  return data;
}

export async function getIntention(id: number) {
  const { data } = await api.get(`/intentions/${id}`);
  return data;
}

export async function insertIntention(payload: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const { data } = await api.post("/intentions", payload);
  return data;
}

export async function deleteIntention(id: number) {
  const { data } = await api.delete(`/intentions/${id}`);
  return data;
}
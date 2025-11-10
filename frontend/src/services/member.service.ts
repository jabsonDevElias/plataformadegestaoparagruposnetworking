import api from "@/src/services/api";

export async function insertMember(payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const { data } = await api.post("/members", payload);
  return data;
}
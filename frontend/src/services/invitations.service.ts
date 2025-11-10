import api from "@/src/services/api";

export async function insertInvitation(id: number) {
  const { data } = await api.post(`/invitations/${id}`);
  return data;
}
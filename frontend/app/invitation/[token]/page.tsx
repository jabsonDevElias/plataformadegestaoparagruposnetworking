"use client";
import { useParams } from "next/navigation";

export default function InvitationPage() {
  const params = useParams();
  const token = params.token;

  return <div>{token}</div>;
}

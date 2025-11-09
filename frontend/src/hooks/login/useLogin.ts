import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@/src/services/login.service";
import { useModal } from "@/src/context/ModalContext";
import { useRouter } from "next/navigation";

export function useSignIn() {
  const { openModal } = useModal();
  const router = useRouter();

  return useMutation({
    mutationFn: signIn,
    onSuccess: async (data) => {


      localStorage.setItem("authToken", data.token);

      openModal({
        title: "",
        message: "Login realizado com sucesso!",
      });

      router.push("/dashboard");
    },
    onError: () => {
      openModal({
        title: "",
        message: "Erro ao tentar o login",
      });
    },
  });
}


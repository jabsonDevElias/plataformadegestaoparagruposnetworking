import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@/src/services/login.service";
import { useModal } from "@/src/context/ModalContext";

export function useSignIn() {
  
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      openModal({
        title: "",
        message: "Login realizado com sucesso!",
        onConfirm: () => {
          console.log("ok!");
        },
      });
    },
    onError: (e) => {
      openModal({
        title: "",
        message: "Erro ao Tentar o Login",
        onConfirm: () => {
          console.log("ok!");
        },
      });
    },
  });
}

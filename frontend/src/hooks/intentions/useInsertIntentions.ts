import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertIntention } from "@/src/services/intentions.service";
import { useModal } from "@/src/context/ModalContext";

export function useInsertIntention() {
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  return useMutation({
    mutationFn: insertIntention,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intentions"] });
      openModal({
        title: "",
        message:
          "Sua intenção foi enviada com sucesso! Em breve retornaremos pelo e-mail cadastrado.",
        onConfirm: () => {
          console.log("Deletado!");
        },
      });
    },
    onError: () => {
      openModal({
        title: "",
        message:
          "Error.",
        onConfirm: () => {
          console.log("Deletado!");
        },
      });
    },
  });
}

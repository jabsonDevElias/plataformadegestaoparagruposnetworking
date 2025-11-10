import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertMember } from "@/src/services/member.service";
import { useModal } from "@/src/context/ModalContext";

export function useInsertMembers() {
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  return useMutation({
    mutationFn: insertMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      openModal({
        title: "",
        message:
          "Cadastro Realizado com Sucesso!.",
        onConfirm: () => {
          console.log("ok!");
        },
      });
    },
    onError: () => {
      openModal({
        title: "",
        message:
          "Error.",
        onConfirm: () => {
          console.log("ok!");
        },
      });
    },
  });
}

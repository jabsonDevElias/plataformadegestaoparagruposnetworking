import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIntention } from "@/src/services/intentions.service";
import { useModal } from "@/src/context/ModalContext";

export function useDeleteIntention() {
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  return useMutation({
    mutationFn: deleteIntention,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intentions"] });
      openModal({
        title: "",
        message: "Intenção Excluida com Sucesso!",
        onConfirm: () => {
          console.log("Deletado!");
        },
      });
    },
    onError:(e)=>{
      console.log(e);
    }
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertInvitation } from "@/src/services/invitations.service";
import { useModal } from "@/src/context/ModalContext";

export function useInsertInvitation() {
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => insertInvitation(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      openModal({
        title: "",
        message: `Segue o link do Convite: http://localhost:3000/invitation/${data.token_invitation}`,
        onConfirm: () => {
          console.log("ok!");
        },
      });
      console.log(
        `Enviado para o E-mail o link:http://localhost:3000/invitation/${data.token_invitation}`
      );
    },
    onError: (e) => console.log(e),
  });
}

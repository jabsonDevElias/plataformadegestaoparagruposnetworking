"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface Props {
  open: boolean;
  closeModal: () => void;
  title?: string;
  message?: string;
  type?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function GlobalModal({
  open,
  closeModal,
  title = "Confirmação",
  message = "",
  type = "confirmacao",
  onConfirm,
  onCancel,
}: Props) {
  let colorBtn = "bg-teal-500";
  let cancelatBtn = true;
  let titleBtn = "";

  switch (type) {

    case "confirmacao":
        colorBtn = "bg-lime-500";
        cancelatBtn = false;
        titleBtn = "Ok";
      break;

    default:
      break;
  }
  function handleConfirm() {
    onConfirm?.();
    closeModal();
  }
  function handleCancel() {
    onCancel?.();
    closeModal();
  }

  return (
    <Dialog open={open} onClose={closeModal} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-gray-800 p-6 rounded-lg shadow-md text-white max-w-sm w-full">
          <DialogTitle className="text-lg font-semibold mb-2">
            {title}
          </DialogTitle>

          <p className="text-gray-300">{message}</p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleCancel}
              style={{display:(cancelatBtn)?"block":"none"}}
              className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className={`px-3 py-1 ${colorBtn} rounded hover:${colorBtn} cursor-pointer`}
            >
              Confirmar
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

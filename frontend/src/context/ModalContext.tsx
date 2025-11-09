"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { GlobalModal } from "@/src/components/GlobalModal";

interface ModalOptions {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalContextProps {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ModalOptions>({});

  function openModal(opts: ModalOptions) {
    setOptions(opts);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <GlobalModal
          open={isOpen}
          closeModal={closeModal}
          {...options}
        />
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Erro no modal!");
  return ctx;
}

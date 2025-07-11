import { createContext, useContext, useState, ReactNode } from "react";

// Tipo do conteúdo do modal — você pode ajustar conforme seu uso real
type ModalContentType = ReactNode | null;

interface ModalContextType {
  isOpen: boolean;
  modalContent: ModalContentType;
  openModal: (content: ModalContentType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// ⛳ Aqui tipamos o children do Provider
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContentType>(null);

  const openModal = (content: ModalContentType) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

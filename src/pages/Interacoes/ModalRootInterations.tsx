import { useModal } from "../../Context/ModalContext";

export default function ModalRoot() {
  const { isOpen, modalContent, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fundo espelhado */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: "url('/caminho-da-imagem.jpg')",
          transform: "scaleX(-1)", // espelha horizontalmente
          filter: "brightness(0.5)", // escurece um pouco para não competir com o modal
        }}
      />
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg relative z-10">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl cursor-pointer"
          onClick={closeModal}
        >
          ×
        </button>
        {modalContent}
      </div>
    </div>
  );
}

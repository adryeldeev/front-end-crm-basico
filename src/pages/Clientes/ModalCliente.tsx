import { useState } from "react";
import { useModal } from "../../Context/ModalContext";
import getApi from "../../services/Api";
interface ModalClienteProps {
  onSuccess?: () => void;
}
interface ClienteForm {
  name: string;
  company: string;
  phone: string;
  position: string;
  status: string;
  observations?: string;
  email?: string;
}

const ModalCliente = ({ onSuccess }: ModalClienteProps) =>{
  const { closeModal } = useModal();
  const api = getApi();

  const [formData, setFormData] = useState<ClienteForm>({
    name: "",
    company: "",
    phone: "",
    position: "",
    status: "LEAD",
    observations: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.company || !formData.phone || !formData.position) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("/client", formData);

      if (response.status === 201) {
      if (onSuccess) onSuccess();
        closeModal(); // ou o seu método de fechar o modal
      } else {
        alert("Erro ao criar cliente. Tente novamente.");
      }
    }
    catch (error: any) {
  if (error.response) {
    console.error("Erro de validação:", error.response.data);
    alert(error.response.data?.error || "Erro ao criar cliente.");
  } else {
    console.error("Erro desconhecido:", error);
    alert("Erro ao criar cliente. Tente novamente.");
  }
}
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">Novo Cliente</h2>

      <input type="text" name="name" placeholder="Nome" className="border px-2 py-1 rounded"
        value={formData.name} onChange={handleChange} />

      <input type="text" name="email" placeholder="E-mail" className="border px-2 py-1 rounded"
        value={formData.email} onChange={handleChange} />

      <input type="text" name="company" placeholder="Empresa" className="border px-2 py-1 rounded"
        value={formData.company} onChange={handleChange} />

      <input type="text" name="phone" placeholder="Telefone" className="border px-2 py-1 rounded"
        value={formData.phone} onChange={handleChange} />

      <input type="text" name="position" placeholder="Posição" className="border px-2 py-1 rounded"
        value={formData.position} onChange={handleChange} />

      <select name="status" className="border px-2 py-1 rounded" value={formData.status} onChange={handleChange}>
        <option value="">Selecione o status</option>
        <option value="LEAD">LEAD</option>
        <option value="CONTATO">CONTATO</option>
        <option value="PROPOSTA">PROPOSTA</option>
        <option value="FECHADO">FECHADO</option>
      </select>
      <textarea
        name="observations"
        placeholder="Observações"
        className="border px-2 py-1 rounded"
        value={formData.observations}
        onChange={handleChange}
      ></textarea>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        disabled={!formData.name || !formData.company || !formData.phone || !formData.position}
      >
        Salvar
      </button>

      <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">
        Cancelar
      </button>
    </form>
  );
};

export default ModalCliente;

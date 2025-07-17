import React, { useState } from 'react';
import { useModal } from '../../Context/ModalContext';
import getApi from '../../services/Api';

interface ModalInterationProps {
  onSuccess?: () => void;
  interaction?: {
    id: number; // Corrigido de string para number
    date: string;
    type: string;
    description: string;
    result?: string;
  };
  clientId?: string;
}

const ModalInterations = ({ onSuccess, interaction, clientId }: ModalInterationProps) => {
  const { closeModal } = useModal();
  const api = getApi();

  const [formData, setFormData] = useState({
    date: interaction?.date || '',
    type: interaction?.type || '',
    description: interaction?.description || '',
    result: interaction?.result || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.type || !formData.description) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    try {
      if (interaction) {
        // Editar
        await api.put(`/interaction/${interaction.id}`, {
          ...formData,
          clientId,
        });
      } else {
        // Criar
        await api.post('/interaction', {
          ...formData,
          clientId,
        });
      }

      if (onSuccess) onSuccess();
      closeModal();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar a interação.');
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">{interaction ? 'Editar Interação' : 'Nova Interação'}</h2>

      <input
        type="date"
        name="date"
        className="border px-2 py-1 rounded"
        value={formData.date}
        onChange={handleChange}
      />

      <select
        name="type"
        className="border px-2 py-1 rounded"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="">Selecione o tipo</option>
        <option value="EMAIL">E-mail</option>
        <option value="WHATSAPP">WhatsApp</option>
        <option value="LIGACAO">Ligação</option>
        <option value="REUNIAO">Reunião</option>
        <option value="VISITA">Visita</option>
        <option value="OUTROS">Outros</option>
      </select>

      <textarea
        name="description"
        placeholder="Descrição"
        className="border px-2 py-1 rounded"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="result"
        placeholder="Resultado (opcional)"
        className="border px-2 py-1 rounded"
        value={formData.result}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        {interaction ? 'Salvar Alterações' : 'Salvar'}
      </button>

      <button
        type="button"
        onClick={closeModal}
        className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Cancelar
      </button>
    </form>
  );
};

export default ModalInterations;

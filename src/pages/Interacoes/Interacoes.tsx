import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getApi from '../../services/Api';
import { GrChapterNext } from "react-icons/gr";
import { BsSkipBackward } from "react-icons/bs";
import ModalInterations from './ModalInterations';
import { useModal } from '../../Context/ModalContext';

interface Cliente {
  id: number;
  name: string;
}

interface Interaction {
  id: number;
  date: string;
  type: string;
  description: string;
  result?: string;
  user?: { name: string };
}

const Interacoes = () => {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filtro, setFiltro] = useState<string>("");
  const [page, setPage] = useState(1);
  const leadsPerPage = 4;
  const { openModal } = useModal();
  const api = getApi();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/client/${id}`);
        setCliente(response.data);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      }
    };

    if (id) fetchCliente();
  }, [id]);

  const fetchInteractions = async () => {
    try {
      const response = await api.get(`/interaction/client/${id}`);
      console.log("Dados recebidos:", response.data);
      const data = response.data;

      setInteractions(Array.isArray(data) ? data : []);
      setError("");
    } catch (error) {
      console.error("Erro ao buscar interações:", error);
      setError("Erro ao buscar interações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      console.log("Buscando interações para clientId:", id);
    if (id) fetchInteractions();
  }, [id]);

  // Filtro de busca
  const interacoesFiltradas = filtro
    ? interactions.filter((interaction) => {
        const filtroLower = filtro.toLowerCase();
        return (
          interaction.description.toLowerCase().includes(filtroLower) ||
          interaction.type.toLowerCase().includes(filtroLower)
        );
      })
    : interactions;

  const pages = Math.ceil(interacoesFiltradas.length / leadsPerPage);
  const paginatedInteractions = interacoesFiltradas.slice(
    (page - 1) * leadsPerPage,
    page * leadsPerPage
  );

  const getStatusClass = (tipos: string | undefined) => {
    switch (tipos?.toLocaleLowerCase()) {
      case 'whatsapp':
        return 'bg-green-100 text-green-800';
      case 'ligacao':
        return 'bg-blue-100 text-blue-800';
      case 'reuniao':
        return 'bg-yellow-100 text-yellow-800';
      case 'visita':
        return 'bg-purple-100 text-purple-800';
      case 'outros':
        return 'bg-gray-100 text-gray-800';
        case 'email':
        return 'bg-orange-100 text-orange-800';
      default:
        return '';
    }
  };
  const onDelete = async (interactionId: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta interação?")) {
      try {
        const response = await api.delete(`/interaction/${interactionId}`);
        if (response.status === 204) {
          setInteractions(interactions.filter(interaction => interaction.id !== interactionId));
        } else {
          alert("Erro ao excluir interação. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao excluir interação:", error);
        alert("Erro ao excluir interação. Tente novamente.");
      }
    }
  }

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">
          Lista de interações do cliente {cliente ? cliente.name : '...'}
        </h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={() =>
            openModal(
              <ModalInterations clientId={id!} onSuccess={fetchInteractions} />
            )
          }
        >
          Adicionar Interação
        </button>
      </div>

      {/* Filtros */}
      <div className="mt-4 mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Filtrar por tipo ou descrição"
          className="border px-2 py-1 rounded"
          onChange={(e) => {
            setFiltro(e.target.value);
            setPage(1);
          }}
        />
        <input
          type="date"
          className="border px-2 py-1 rounded"
          onChange={(e) => {
            // Filtro de data futura (se quiser aplicar)
            console.log(e.target.value);
          }}
        />
      </div>

      {/* Tabela de interações */}
      <table className="min-w-full bg-white mt-4 rounded-lg overflow-hidden shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4 border-b">Data</th>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Descrição</th>
            <th className="py-2 px-4 border-b">Resultado</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInteractions.length > 0 ? (
            paginatedInteractions.map((interaction) => (
              <tr key={interaction.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {new Date(interaction.date).toLocaleDateString()}
                </td>
                
        <td className="py-2 px-4 border-b">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(interaction.type)}`}>
            {interaction.type}
          </span>
        </td>
                <td className="py-2 px-4 border-b">{interaction.description}</td>
                <td
                  className={`py-2 px-4 border-b ${getStatusClass(
                    interaction.result?.toLocaleLowerCase()
                  )}`}
                >
                  {interaction.result?.toLocaleLowerCase() || 'Sem resultado'}
                </td>
                
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                    onClick={() =>
                      openModal(
                        <ModalInterations
                          interaction={interaction}
                          onSuccess={fetchInteractions}
                        />
                      )
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    onClick={() => onDelete(interaction.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                Nenhuma interação encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-gray-600">
          Página {page} de {pages} ({interacoesFiltradas.length} interações)
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
          >
            <BsSkipBackward />
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
            disabled={page === pages}
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
          >
            <GrChapterNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interacoes;

import React, { useEffect, useState } from 'react';
import { useModal } from '../../Context/ModalContext';
import ModalCliente from './ModalCliente';
import getApi from '../../services/Api';
import { Link } from 'react-router-dom';
import { GrChapterNext } from "react-icons/gr";
import { BsSkipBackward } from "react-icons/bs";
interface Cliente {
  id: number;
  name: string;
  company: string;
  phone: string;
  position: string;
  status: string;
  observations?: string;
  email?: string;
}


const Clientes = () => {
  const api = getApi();
  const { openModal } = useModal();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filtro, setFiltro] = useState<string>("");
    const [page, setPage] = useState(1)

  const leadsPerPage = 4

  const fetchClientes = async () => {
    try {
      const response = await api.get('/client');
      setClientes(response.data);
      setError("");
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setError("Erro ao buscar clientes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const onDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        const response = await api.delete(`/client/${id}`);
        if (response.status === 204) {
          setClientes(clientes.filter(cliente => cliente.id !== id));
        } else {
          alert("Erro ao excluir cliente. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        alert("Erro ao excluir cliente. Tente novamente.");
      }
    }
  };
  const clientesFiltrados = filtro
    ? clientes.filter((cliente) => {
        const filtroLower = filtro.toLowerCase();
        return (
          cliente.name.toLowerCase().includes(filtroLower) ||
          cliente.company.toLowerCase().includes(filtroLower)
        );
      })
    : clientes;

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">Erro: {error}</p>;
  }
   const totalPages = Math.ceil(clientesFiltrados .length / leadsPerPage)
  const paginatedLeads = clientesFiltrados .slice(
    (page - 1) * leadsPerPage,
    page * leadsPerPage
  )


 const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'lead':
      return 'bg-green-100 text-green-700';
    case 'contato':
      return 'bg-yellow-100 text-yellow-700';
    case 'proposta':
      return 'bg-blue-100 text-blue-700';
    case 'fechado':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
        <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        onClick={() => openModal(<ModalCliente onSuccess={fetchClientes} />)}
        >
          Adicionar Cliente
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-4">
        <h2 className="mb-2 font-bold text-gray-700">Filtros</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar por nome ou empresa"
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/4"
          />
        </div>
      </div>

      {/* Tabela de clientes */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">E-mail</th>
            <th className="py-2 px-4 border-b">Empresa</th>
            <th className="py-2 px-4 border-b">Telefone</th>
            <th className="py-2 px-4 border-b">Posição</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Observações</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
<tbody>
  {paginatedLeads.length > 0 ? (
    paginatedLeads.map((cliente) => (
      <tr key={cliente.id}>
        <td className="py-2 px-4 border-b">
          <Link to={`/clientes/${cliente.id}/interacoes`} className="text-blue-600 hover:underline">
  {cliente.name.toLocaleLowerCase()}
</Link>
        </td>
        <td className="py-2 px-4 border-b">{cliente.email?.toLocaleLowerCase()}</td>
        <td className="py-2 px-4 border-b">{cliente.company.toLocaleLowerCase()}</td>
        <td className="py-2 px-4 border-b">{cliente.phone}</td>
        <td className="py-2 px-4 border-b">{cliente.position.toLocaleLowerCase()}</td>

        <td className="py-2 px-4 border-b">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(cliente.status)}`}>
            {cliente.status}
          </span>
        </td>
        <td className="py-2 px-4 border-b">{cliente.observations?.toLocaleLowerCase()}</td>
        <td className="py-2 px-4 border-b flex flex-col">
          <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 m-2 cursor-pointer"  onClick={() => openModal(<ModalCliente cliente={cliente} onSuccess={fetchClientes} />)}>Editar</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded m-2 cursor-pointer" onClick={() => onDelete(cliente.id)}>Excluir</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className="text-center py-4">
        Nenhum cliente cadastrado.
      </td>
    </tr>
  )}
</tbody>
      </table>
      {/* Paginação */}
      <div className="flex justify-center items-center gap-4 mt-6">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className={`flex items-center gap-1 px-4 py-2 border rounded ${
      page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
    }`}
  >
    <BsSkipBackward />
    Anterior
  </button>

  <span className="text-gray-700 font-semibold">Página {page} de {totalPages}</span>

  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className={`flex items-center gap-1 px-4 py-2 border rounded ${
      page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
    }`}
  >
    Próximo
    <GrChapterNext />
  </button>
</div>
 </div>
  );
};

export default Clientes;

import React from 'react'
import { useParams } from 'react-router-dom';

const Interacoes = () => {
  const {id} = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Interações do Cliente</h1>
      <p>Detalhes das interações para o cliente com ID: {id}</p>
      {/* Aqui você pode adicionar a lógica para buscar e exibir as interações do cliente */}
    </div>
  )
}

export default Interacoes
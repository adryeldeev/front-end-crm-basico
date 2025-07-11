import React from 'react'

const CadastroUser = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-[#0f1e33] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Cadastro de Usuário</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />
           
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="password">Repita sua senha</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite novamente sua senha"
            />
           
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default CadastroUser
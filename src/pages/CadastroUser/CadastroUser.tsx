import React from 'react'
import getApi from '../../services/Api';
import { useNavigate } from 'react-router-dom';

interface CadastroUserProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const CadastroUser = () => {
  const api = getApi();
  const navigate = useNavigate();
  const [form, setForm] = React.useState<CadastroUserProps>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = React.useState<string>('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(form.password !== form.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    const {name, email, password} = form;

    const userData = {
      name,
      email,
      password
    };
    try {
      const response =  await api.post('/user', userData);
      if (response.status === 201) {
        alert("Usuário cadastrado com sucesso!");
        navigate('/login'); // Redireciona para a página de login após o cadastro

      } 
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário. Tente novamente.");
      setError("Erro ao cadastrar usuário. Tente novamente.");
    }

  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-[#0f1e33] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white"
        >Cadastro de Usuário</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
              name="password"
              value={form.password}
              onChange={handleChange}

            />
           
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="password">Repita sua senha</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite novamente sua senha"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
           
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-white">Já tem uma conta? <a href="/login" className="text-blue-400 hover:underline">Faça login</a></p>
          </div>
      </div>
    </div>
  )
}

export default CadastroUser
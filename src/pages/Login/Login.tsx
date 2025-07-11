import React from 'react';
import { useAuth } from '../../Context/AuthProvider';

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const { loginAction, error, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginAction(formData); // ← Aqui faz o login de fato
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-[#0f1e33] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border text-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

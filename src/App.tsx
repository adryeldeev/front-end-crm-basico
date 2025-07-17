import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Clientes from "./pages/Clientes/Clientes";
import Interacoes from "./pages/Interacoes/Interacoes";
import Logout from "./pages/Logout/Logout";
import ModalRoot from "./pages/Clientes/ModalRoot";
import Login from "./pages/Login/Login";
import CadastroUser from "./pages/CadastroUser/CadastroUser";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <>
    <AuthProvider>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-usuario" element={<CadastroUser />} /> {/* Redireciona para Login, pode ser alterado para CadastroUser se necessário */}
        {/* Rotas privadas com sidebar */}
        <Route element={<PrivateRoutes />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clientes />} />
          <Route path="/clientes/:id/interacoes" element={<Interacoes />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        </Route>
      </Routes>

      <ModalRoot /> {/* 👈 Adicione aqui fora das <Routes /> */}
    </AuthProvider>
    </>
  );
}

export default App;

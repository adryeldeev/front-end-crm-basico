import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from 'axios';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ReactNode } from 'react';
import getApi from "../services/Api";

interface AuthProviderProps {
  children: ReactNode;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: JwtPayload | null;
  token: string;
  loginAction: (credentials: Credentials) => Promise<void>;
  logOut: () => void;
  error: string;
  loading: boolean;
  isAuthenticated: boolean;
}

// TIPAGEM aplicada aqui 👇
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("site") || "");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const isAuthenticated = !!token;
  
  const navigate = useNavigate();
  
  const loginAction = async (credentials: Credentials) => {
    const api = getApi();
    
  try {
    const response = await api.post("/user/login", credentials);
    const { token } = response.data;

    if (token) {
      localStorage.setItem("site", token);
      setToken(token);
      const decodedUser = jwtDecode<JwtPayload>(token);
      setUser(decodedUser);

      setError("");
      navigate("/");
    }
  } catch (err: unknown) {
    const error = err as AxiosError;
    const status = error.response?.status;
    if (status === 401) setError("E-mail ou senha incorretos.");
    else if (status === 404) setError("Usuário não encontrado.");
    else setError("Erro no login. Tente novamente.");
  }
};

  const logOut = () => {
    localStorage.removeItem("site");
    setUser(null);
    setToken("");
    navigate("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("site");
    if (storedToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch {
        localStorage.removeItem("site");
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logOut, error, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Hook personalizado
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

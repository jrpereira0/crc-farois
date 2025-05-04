import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  username: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Verificar autenticação quando o componente é montado
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    initAuth();
  }, []);

  // Verificar se o usuário está autenticado
  const checkAuth = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/me");
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setError(null);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (err) {
      setUser(null);
      setError("Erro ao verificar autenticação");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Credenciais inválidas");
        toast({
          title: "Falha no login",
          description: errorData.message || "Credenciais inválidas. Tente novamente.",
          variant: "destructive",
        });
        return false;
      }
    } catch (err) {
      setError("Erro ao tentar fazer login");
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
      setError(null);
      toast({
        title: "Logout realizado",
        description: "Você saiu do sistema com sucesso.",
      });
    } catch (err) {
      setError("Erro ao tentar fazer logout");
      toast({
        title: "Erro no logout",
        description: "Ocorreu um erro ao tentar sair do sistema.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

// Componente para proteger rotas que exigem autenticação
interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();
  const [redirected, setRedirected] = useState(false);

  // Solução mais direta sem estados adicionais
  useEffect(() => {
    // Se não estiver carregando, não tiver usuário e ainda não redirecionou
    if (!isLoading && !user && !redirected) {
      setRedirected(true); // Marca que já redirecionou para evitar loops
      navigate("/login");
    }
  }, [user, isLoading, navigate, redirected]);

  // Mostra o spinner enquanto carrega
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a237e]"></div>
      </div>
    );
  }

  // Se não tiver usuário, não renderiza nada (o redirecionamento acontecerá pelo useEffect)
  if (!user) {
    return null;
  }

  // Só renderiza os filhos se houver um usuário autenticado
  return <>{children}</>;
};
import { createContext, useState, useContext, useEffect, ReactNode, useRef } from "react";
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
  
  // Usar ref para controlar se a verificação de autenticação já está em andamento
  const isCheckingAuth = useRef(false);
  const initialCheckComplete = useRef(false);

  // Verificar autenticação quando o componente é montado com debounce
  useEffect(() => {
    // Tempo mínimo entre verificações de autenticação (em ms)
    const AUTH_DEBOUNCE_TIME = 2000; 
    let lastCheck = 0;
    
    const initAuth = async () => {
      const now = Date.now();
      
      // Verifica se já passou tempo suficiente desde a última verificação
      if (now - lastCheck < AUTH_DEBOUNCE_TIME) {
        console.log("Verificação de autenticação ignorada (debounce)");
        return;
      }
      
      // Se não está verificando e não completou a verificação inicial
      if (!initialCheckComplete.current && !isCheckingAuth.current) {
        lastCheck = now;
        isCheckingAuth.current = true;
        console.log("Executando verificação inicial de autenticação");
        
        try {
          await checkAuth();
        } finally {
          initialCheckComplete.current = true;
          isCheckingAuth.current = false;
          setIsLoading(false);
        }
      } else {
        // Se já completou a verificação inicial, não precisa setLoading para false novamente
        if (initialCheckComplete.current && isLoading) {
          setIsLoading(false);
        }
      }
    };
    
    initAuth();
  }, []);

  // Cache de autenticação para evitar requisições desnecessárias
  const lastAuthCheck = useRef<number>(0);
  const AUTH_CACHE_TIME = 30000; // 30 segundos em ms
  
  // Verificar se o usuário está autenticado
  const checkAuth = async (): Promise<boolean> => {
    const now = Date.now();
    
    // Se já estiver verificando, não faça nada
    if (isCheckingAuth.current) {
      console.log("Verificação em andamento, retornando estado atual");
      return !!user; // Retorna o estado atual
    }
    
    // Se o usuário já está autenticado e a última verificação foi recente, não faz nova verificação
    if (user && now - lastAuthCheck.current < AUTH_CACHE_TIME) {
      console.log("Usuário já autenticado e cache válido, pulando verificação");
      return true;
    }
    
    isCheckingAuth.current = true;
    let wasLoading = isLoading;
    
    try {
      // Só altera estado de loading se já não estiver carregando
      if (!wasLoading) {
        setIsLoading(true);
      }
      
      console.log("Verificando autenticação...");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10s
      
      try {
        const response = await fetch("/api/me", {
          credentials: "include", // Importante: enviar cookies para autenticação
          headers: {
            'Accept': 'application/json'
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const userData = await response.json();
          console.log("Autenticação verificada com sucesso:", userData);
          
          // Atualizar o timestamp da última verificação bem-sucedida
          lastAuthCheck.current = now;
          
          // Só atualiza o estado se mudou
          if (!user || user.id !== userData.id) {
            setUser(userData);
          }
          
          if (error) setError(null);
          
          return true;
        } else {
          // Se tivemos um usuário antes e agora não temos, a sessão provavelmente expirou
          if (user) {
            console.log("Sessão expirada ou inválida");
            setError("Sua sessão expirou. Por favor, faça login novamente.");
            toast({
              title: "Sessão expirada",
              description: "Sua sessão expirou ou foi invalidada. Por favor, faça login novamente.",
              variant: "destructive",
            });
          } else {
            console.log("Usuário não autenticado");
          }
          
          if (user) setUser(null);
          return false;
        }
      } catch (fetchError) {
        // Limpar o timeout se houver erro
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') {
        console.warn("Verificação de autenticação abortada por timeout");
      } else {
        console.error("Erro ao verificar autenticação:", err);
      }
      
      // Não alteramos o estado do usuário em caso de erro de rede
      // apenas reportamos o erro
      setError("Erro ao verificar autenticação");
      return !!user; // Mantém o estado atual em caso de erro
    } finally {
      // Só altera estado de loading se ele foi alterado por esta verificação
      if (!wasLoading) {
        setIsLoading(false);
      }
      isCheckingAuth.current = false;
    }
  };

  // Referência para controlar se já existe um login em andamento
  const isLoggingIn = useRef(false);

  // Login
  const login = async (username: string, password: string): Promise<boolean> => {
    // Evitar chamadas simultâneas
    if (isLoggingIn.current) {
      return false;
    }
    
    isLoggingIn.current = true;
    
    try {
      setIsLoading(true);
      setError(null);

      console.log("Tentando fazer login com:", username);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Importante: enviar cookies para autenticação
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log("Login bem-sucedido:", data);
        // Atualizar o estado do usuário diretamente com os dados retornados
        setUser(data);
        return true;
      } else {
        console.error("Falha no login:", data);
        setError(data.message || "Credenciais inválidas");
        toast({
          title: "Falha no login",
          description: data.message || "Credenciais inválidas. Tente novamente.",
          variant: "destructive",
        });
        return false;
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Erro ao tentar fazer login");
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
      isLoggingIn.current = false;
    }
  };

  // Referência para controlar se já existe um logout em andamento
  const isLoggingOut = useRef(false);

  // Logout
  const logout = async (): Promise<void> => {
    // Evitar chamadas simultâneas
    if (isLoggingOut.current) {
      return;
    }
    
    isLoggingOut.current = true;
    
    try {
      setIsLoading(true);
      
      console.log("Executando logout...");
      await fetch("/api/logout", { 
        method: "POST",
        credentials: "include" // Importante: enviar cookies para autenticação
      });
      
      console.log("Logout realizado com sucesso");
      setUser(null);
      setError(null);
      toast({
        title: "Logout realizado",
        description: "Você saiu do sistema com sucesso.",
      });
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      setError("Erro ao tentar fazer logout");
      toast({
        title: "Erro no logout",
        description: "Ocorreu um erro ao tentar sair do sistema.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      isLoggingOut.current = false;
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
  const { user, isLoading, checkAuth } = useAuth();
  const [, navigate] = useLocation();
  const hasRedirected = useRef(false);
  const authChecked = useRef(false);

  useEffect(() => {
    // Para evitar múltiplas verificações desnecessárias
    const verifyAuth = async () => {
      if (!authChecked.current && !isLoading) {
        authChecked.current = true;
        // Verificar autenticação apenas uma vez por montagem do componente
        const isAuthenticated = await checkAuth();
        
        if (!isAuthenticated && !hasRedirected.current) {
          console.log("ProtectedRoute: Redirecionando para tela de login após verificação");
          hasRedirected.current = true;
          navigate("/login");
        }
      }
    };
    
    verifyAuth();
  }, []);

  // Se não estiver carregando, não tiver usuário e ainda não redirecionou (via verificação manual)
  useEffect(() => {
    if (!isLoading && !user && !hasRedirected.current) {
      console.log("ProtectedRoute: Redirecionando para tela de login (verificação de estado)");
      hasRedirected.current = true;
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  // Se ainda estiver carregando, mostre um spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a237e]"></div>
      </div>
    );
  }

  // Se não estiver carregando e não tiver usuário, não renderiza nada
  // (o redirecionamento acontecerá pelo useEffect)
  if (!user) {
    console.log("ProtectedRoute: Usuário não está autenticado");
    return null;
  }

  // Resetar o flag de redirecionamento se o usuário estiver autenticado
  hasRedirected.current = false;
  
  console.log("ProtectedRoute: Usuário autenticado, renderizando conteúdo protegido");
  // Só renderiza os filhos se houver um usuário autenticado
  return <>{children}</>;
};
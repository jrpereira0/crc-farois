import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Detectar ambiente de produção para ajustes
  const isProduction = import.meta.env.PROD;
  
  console.log(`[apiRequest] Iniciando ${method} para ${url} (${isProduction ? 'produção' : 'desenvolvimento'})`, data);
  
  try {
    // Configuração básica da requisição
    const headers: Record<string, string> = {
      ...(data ? { "Content-Type": "application/json" } : {}),
      // Adicionar cabeçalhos que ajudam com CORS e cookies
      "X-Requested-With": "XMLHttpRequest",
    };

    // Em produção, podemos precisar de ajustes específicos
    if (isProduction) {
      headers["Cache-Control"] = "no-cache";
    }
    
    const res = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
      // Garantir que os cookies sejam enviados mesmo cross-domain
      mode: "cors",
      cache: "no-store", // Importante para evitar caching incorreto
    });

    console.log(`[apiRequest] Resposta recebida`, {
      status: res.status,
      statusText: res.statusText,
      url: res.url,
      isAuthenticated: res.status !== 401,
    });

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error('[apiRequest] Erro durante a requisição:', error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Detectar ambiente de produção
    const isProduction = import.meta.env.PROD;
    
    console.log(`[getQueryFn] Iniciando requisição para ${queryKey[0]} (${isProduction ? 'produção' : 'desenvolvimento'})`);
    
    // Configuração básica da requisição
    const headers: Record<string, string> = {
      // Adicionar cabeçalhos que ajudam com CORS e cookies
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json",
    };

    // Em produção, podemos precisar de ajustes específicos
    if (isProduction) {
      headers["Cache-Control"] = "no-cache";
    }
    
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
      headers,
      mode: "cors",
      cache: "no-store",
    });
    
    console.log(`[getQueryFn] Resposta recebida para ${queryKey[0]}`, {
      status: res.status,
      statusText: res.statusText,
      isAuthenticated: res.status !== 401,
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      console.log(`[getQueryFn] Erro 401 tratado conforme configuração (returnNull)`);
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

// Detecção de ambiente
const isProduction = import.meta.env.PROD;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: isProduction ? 60000 : false, // Refetch a cada minuto em produção
      refetchOnWindowFocus: isProduction, // Refetch ao focar a janela em produção
      staleTime: isProduction ? 30000 : Infinity, // 30 segundos de stale time em produção, infinito em dev
      retry: isProduction ? 1 : false, // Uma tentativa adicional em caso de falha em produção
      retryDelay: 1000, // 1 segundo entre tentativas
    },
    mutations: {
      retry: isProduction ? 1 : false, // Uma tentativa adicional em caso de falha em produção
      retryDelay: 1000, // 1 segundo entre tentativas
    },
  },
});

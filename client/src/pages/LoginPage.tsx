import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const loginSchema = z.object({
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { login, user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Verificar se o usuário já está autenticado
  useEffect(() => {
    // Teste de conexão para debug
    console.log("Verificando estado de autenticação na página de login");

    if (user) {
      console.log("Usuário já autenticado, redirecionando para o dashboard");
      navigate("/admin/dashboard");
    } else {
      console.log("Usuário não autenticado, permanecendo na página de login");
    }
  }, [user, navigate]);
  
  // Hook form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      console.log("Iniciando tentativa de login com:", data.username);
      
      const success = await login(data.username, data.password);
      
      console.log("Resultado do login:", success ? "Sucesso" : "Falha");
      
      if (success) {
        toast({
          title: "Login bem-sucedido!",
          description: "Redirecionando para o painel administrativo...",
          variant: "default",
        });
        
        console.log("Redirecionando para o dashboard após login bem-sucedido");
        
        // Aguardar um momento antes de navegar para garantir que o estado foi atualizado
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 300);
      } else {
        console.log("Login falhou, permanecendo na página de login");
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      
      toast({
        title: "Erro no sistema",
        description: "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a237e]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden shadow-xl rounded-xl">
        {/* Lado esquerdo - Form de login */}
        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-8 flex flex-col">
          <div className="mb-8 text-center">
            <img 
              src="/assets/LOGO BRANCA_1746383304420.png" 
              alt="CRC Faróis" 
              className="h-16 mx-auto mb-6 bg-[#1a237e] p-3 rounded-md"
            />
            <h1 className="text-2xl font-bold text-gray-800">Acesso Administrativo</h1>
            <p className="text-gray-600 mt-2">Entre com suas credenciais para acessar o painel</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de Usuário</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Digite seu nome de usuário"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite sua senha"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-[#1a237e] hover:bg-[#283593] text-white" 
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <a href="/" className="text-[#1a237e] hover:underline text-sm">
              Voltar para o site
            </a>
          </div>
        </div>
        
        {/* Lado direito - Banner/Imagem */}
        <div className="hidden lg:block w-1/2 bg-[#1a237e] p-8 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Painel Administrativo</h2>
            <p className="mb-6 text-white/80">
              CRC Faróis - Gerenciamento de contatos e interações com clientes.
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Gerenciamento de Contatos</h3>
                  <p className="text-sm text-white/70">Veja e responda às solicitações de clientes.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Estatísticas e Análises</h3>
                  <p className="text-sm text-white/70">Visualize relatórios e métricas de interações.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Gestão de Mensagens</h3>
                  <p className="text-sm text-white/70">Organize mensagens por status e prioridade.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/20 text-white/60 text-sm">
            © {new Date().getFullYear()} CRC Faróis - Todos os direitos reservados
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
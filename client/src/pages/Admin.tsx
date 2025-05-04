import { useState, useEffect } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../hooks/use-auth";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import crcLogo from "../assets/crc-logo.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Inbox, 
  ClipboardList, 
  Settings, 
  Search,
  Home as HomeIcon,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCcw,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Eye,
  MessagesSquare,
  UserPlus,
  Check,
  Key,
  ShieldAlert,
  X,
  Edit,
  Phone,
  Mail,
  EyeOff
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Função para abrir o WhatsApp Web com o número de telefone
const openWhatsApp = (phone: string) => {
  // Limpar o número de telefone (remover formatação)
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Adicionar o código do país se não estiver presente
  const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
  
  // Abrir o WhatsApp Web
  window.open(`https://wa.me/${fullPhone}`, '_blank');
};

// Componente principal do painel administrativo
const Admin = () => {
  const [location, navigate] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Verificar qual página mostrar com base no URL
  const isContactsPage = location.includes('/contacts');
  const isSettingsPage = location === '/admin/settings';
  const isDashboardPage = location === '/admin' || location === '/admin/dashboard' || 
                          (!isContactsPage && !isSettingsPage);

  // Não precisamos mais redirecionar, pois o dashboard é exibido diretamente na raiz
  // useEffect(() => {
  //   if (location === "/admin") {
  //     console.log("Redirecionando da raiz do admin para o dashboard");
  //     navigate("/admin");
  //   }
  // }, [location, navigate]);

  // Alternar menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Evitar rolagem do body quando o menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Determinar a guia ativa com base na URL
  const getActiveTab = () => {
    if (isContactsPage) return "contacts";
    if (isSettingsPage) return "settings";
    return "dashboard";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={getActiveTab()} 
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Barra superior */}
        <AdminHeader toggleMobileMenu={toggleMobileMenu} />
        
        {/* Conteúdo principal */}
        <main className="flex-1 overflow-y-auto py-4 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            {isDashboardPage && <AdminDashboard />}
            {isContactsPage && <AdminContacts />}
            {isSettingsPage && <AdminSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};

// Componente de cabeçalho do painel administrativo
const AdminHeader = ({ toggleMobileMenu }: { toggleMobileMenu?: () => void }) => {
  const { logout, user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout realizado",
        description: "Você saiu do sistema com sucesso.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erro no logout",
        description: "Ocorreu um erro ao tentar sair do sistema.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4 md:px-6 flex items-center justify-between shadow-sm sticky top-0 z-20">
      <div className="flex items-center">
        {/* Botão de menu para mobile */}
        <Button 
          variant="ghost" 
          className="md:hidden mr-2 text-gray-700 hover:bg-gray-100"
          onClick={toggleMobileMenu}
          size="sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Painel Administrativo</h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <SearchBar />
        <Button 
          variant="ghost" 
          className="text-gray-700 hover:bg-gray-100 hidden sm:flex"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span>Sair</span>
        </Button>
        <Button 
          variant="ghost" 
          className="text-gray-700 hover:bg-gray-100 sm:hidden"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

// Componente de barra de pesquisa
const SearchBar = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input 
        type="text" 
        placeholder="Buscar..." 
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
      />
    </div>
  );
};

// Componente de barra lateral do painel administrativo
const AdminSidebar = ({ activeTab, isMobileMenuOpen, toggleMobileMenu }: { 
  activeTab: string;
  isMobileMenuOpen?: boolean;
  toggleMobileMenu?: () => void;
}) => {
  const [, navigate] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  
  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    if (toggleMobileMenu && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-6 py-4 bg-[#1a237e] border-b border-white/10 shadow-md relative">
        {!collapsed && (
          <div className="flex items-center justify-center mb-2">
            <img 
              src="/assets/LOGO BRANCA_1746383304420.png" 
              alt="CRC Faróis" 
              className="h-auto w-full mx-auto max-w-[160px]" 
            />
          </div>
        )}
        
        {/* Botão de colapsar */}
        <button 
          onClick={toggleCollapse}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#1a237e] hover:bg-gray-100 focus:outline-none border-2 border-blue-500 z-10"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
      
      {/* Links de navegação */}
      <nav className={`flex-1 ${collapsed ? "px-2" : "px-4"} py-6`}>
        <ul className="space-y-1">
          <li>
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className={`flex items-center ${collapsed ? "justify-center px-2" : "px-4"} py-3 rounded-md transition-colors duration-200 text-white hover:bg-white/20`}
              title={collapsed ? "Voltar ao site" : ""}
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="ml-3">Voltar ao site</span>}
            </a>
          </li>
          <li>
            <a 
              href="/admin" 
              onClick={handleNavigation("/admin")}
              className={`flex items-center ${collapsed ? "justify-center px-2" : "px-4"} py-3 rounded-md transition-colors duration-200 ${activeTab === "dashboard" 
                ? "bg-white text-[#1a237e] font-semibold shadow-md" 
                : "text-white hover:bg-white/20"}`}
              title={collapsed ? "Dashboard" : ""}
            >
              <ClipboardList className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </a>
          </li>
          <li>
            <a 
              href="/admin/contacts" 
              onClick={handleNavigation("/admin/contacts")}
              className={`flex items-center ${collapsed ? "justify-center px-2" : "px-4"} py-3 rounded-md transition-colors duration-200 ${activeTab === "contacts" 
                ? "bg-white text-[#1a237e] font-semibold shadow-md" 
                : "text-white hover:bg-white/20"}`}
              title={collapsed ? "Contatos" : ""}
            >
              <Inbox className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="ml-3">Contatos</span>}
            </a>
          </li>
          <li>
            <a 
              href="/admin/settings"
              onClick={handleNavigation("/admin/settings")} 
              className={`flex items-center ${collapsed ? "justify-center px-2" : "px-4"} py-3 rounded-md transition-colors duration-200 ${activeTab === "settings" 
                ? "bg-white text-[#1a237e] font-semibold shadow-md" 
                : "text-white hover:bg-white/20"}`}
              title={collapsed ? "Configurações" : ""}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="ml-3">Configurações</span>}
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Informações do usuário */}
      <div className={`${collapsed ? "px-2" : "px-6"} py-4 border-t border-white/10 bg-[#303f9f] shadow-inner`}>
        {!collapsed ? (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center mr-3 shadow-md flex-shrink-0">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-white">{user?.name || "Administrador"}</p>
              <p className="text-sm text-white/90">Logado agora</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center shadow-md">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </div>
    </>
  );
  
  // Versão para desktop
  return (
    <>
      {/* Versão desktop */}
      <aside className={`hidden md:flex ${collapsed ? "w-16" : "w-64"} bg-[#283593] text-white flex-col shadow-xl z-10 transition-all duration-300 ease-in-out relative`}>
        {sidebarContent}
      </aside>
      
      {/* Versão mobile - overlay quando menu aberto */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggleMobileMenu}
        ></div>
      )}
      
      {/* Versão mobile - menu lateral */}
      <aside 
        className={`md:hidden fixed inset-y-0 left-0 w-64 bg-[#283593] text-white flex-col shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

// Skeleton para os cards do dashboard
const DashboardCardSkeleton = () => {
  return (
    <Card className="bg-white shadow-sm transition-shadow duration-300 animate-pulse">
      <CardHeader className="pb-2">
        <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
          <div className="h-8 w-12 bg-gray-200 rounded"></div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </CardFooter>
    </Card>
  );
};

// Skeleton para a lista de contatos recentes
const RecentContactsListSkeleton = () => {
  return (
    <div className="space-y-4 divide-y divide-gray-200">
      {[1, 2, 3].map((item) => (
        <div key={item} className="py-4 animate-pulse">
          <div className="flex items-start">
            <div className="flex-1">
              <div className="flex items-center flex-wrap mb-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="ml-2 h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-3 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-16 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 rounded mt-2"></div>
            </div>
            <div className="ml-2 flex flex-col space-y-2">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Dashboard - Página inicial do painel administrativo
const AdminDashboard = () => {
  const [, navigate] = useLocation();
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    unread: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    // Em um cenário real, faríamos uma chamada para a API para obter esses dados
    fetch("/api/admin/contacts")
      .then(res => res.json())
      .then(data => {
        const pending = data.filter((c: any) => c.status === "pending").length;
        const inProgress = data.filter((c: any) => c.status === "in-progress").length;
        const completed = data.filter((c: any) => c.status === "completed").length;
        const unread = data.filter((c: any) => !c.isRead).length;
        
        setCounts({
          total: data.length,
          pending,
          inProgress,
          completed,
          unread
        });
        
        // Adicionar um pequeno delay para tornar a transição mais suave
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch(err => {
        console.error("Erro ao buscar estatísticas:", err);
        setIsLoading(false);
      });
  }, []);
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isLoading ? (
          <>
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
          </>
        ) : (
          <>
            <DashboardCard 
              title="Total de Contatos"
              value={counts.total}
              icon={<Inbox className="w-full h-full text-primary" />}
              linkText="Ver todos"
              linkUrl="/admin/contacts"
            />
            <DashboardCard 
              title="Pendentes"
              value={counts.pending}
              icon={<AlertCircle className="w-full h-full text-amber-500" />}
              linkText="Ver pendentes"
              linkUrl="/admin/contacts"
              color="amber"
            />
            <DashboardCard 
              title="Em Andamento"
              value={counts.inProgress}
              icon={<RefreshCcw className="w-full h-full text-blue-500" />}
              linkText="Ver em andamento"
              linkUrl="/admin/contacts"
              color="blue"
            />
            <DashboardCard 
              title="Concluídos"
              value={counts.completed}
              icon={<CheckCircle className="w-full h-full text-green-500" />}
              linkText="Ver concluídos"
              linkUrl="/admin/contacts"
              color="green"
            />
          </>
        )}
      </div>
      
      {/* Últimos contatos recebidos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Contatos Recentes</CardTitle>
          <CardDescription>
            Os contatos mais recentes recebidos pelo site
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <RecentContactsListSkeleton /> : <RecentContactsList />}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/contacts");
            }}
            disabled={isLoading}
          >
            Ver todos os contatos
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Componente de card para o dashboard
interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  linkText: string;
  linkUrl: string;
  color?: "primary" | "amber" | "blue" | "green";
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon, 
  linkText, 
  linkUrl,
  color = "primary" 
}) => {
  const [, navigate] = useLocation();
  
  const getColorClass = () => {
    switch (color) {
      case "amber": return "text-amber-500 hover:text-amber-600";
      case "blue": return "text-blue-500 hover:text-blue-600";
      case "green": return "text-green-500 hover:text-green-600";
      default: return "text-primary hover:text-secondary";
    }
  };
  
  const handleCardLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Determinar qual filtro aplicar com base na cor do card
    if (color === "amber") {
      navigate("/admin/contacts", { state: { filter: "pending" } });
    } else if (color === "blue") {
      navigate("/admin/contacts", { state: { filter: "in-progress" } });
    } else if (color === "green") {
      navigate("/admin/contacts", { state: { filter: "completed" } });
    } else {
      navigate(linkUrl);
    }
  };
  
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          <div className="h-8 w-8">
            {icon}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <button
          onClick={handleCardLinkClick}
          className={`inline-flex items-center text-sm font-medium ${getColorClass()} bg-transparent border-none cursor-pointer p-0 break-words`}
        >
          {linkText}
          <ChevronRight className="h-4 w-4 ml-1 flex-shrink-0" />
        </button>
      </CardFooter>
    </Card>
  );
};

// Componente de lista de contatos recentes para o dashboard
const RecentContactsList = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedContactId, setExpandedContactId] = useState<number | null>(null);
  const [, navigate] = useLocation();
  
  useEffect(() => {
    fetch("/api/admin/contacts")
      .then(res => res.json())
      .then(data => {
        // Exibir apenas os 5 contatos mais recentes
        setContacts(data.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar contatos recentes:", err);
        setLoading(false);
      });
  }, []);
  
  const toggleExpandMessage = (contactId: number) => {
    setExpandedContactId(expandedContactId === contactId ? null : contactId);
  };
  
  const goToContactDetails = (e: React.MouseEvent, contactId: number) => {
    e.preventDefault();
    navigate(`/admin/contacts`);
  };
  
  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#283593]"></div>
        </div>
        <p className="text-gray-500">Carregando contatos recentes...</p>
      </div>
    );
  }
  
  if (contacts.length === 0) {
    return (
      <div className="py-20 text-center">
        <Inbox className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Nenhum contato recebido ainda.</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-gray-200">
      {contacts.map((contact) => (
        <div key={contact.id} className="py-4 hover:bg-gray-50 px-4 rounded-md -mx-4 transition-colors duration-150">
          <div className="flex items-start">
            <div className="flex-1">
              <div className="flex items-center flex-wrap mb-1">
                <h4 className="font-medium text-gray-900">{contact.name}</h4>
                {!contact.isRead && (
                  <Badge variant="default" className="ml-2 bg-[#283593] hover:bg-[#1a237e]">
                    Não lido
                  </Badge>
                )}
                <StatusBadge status={contact.status} className="ml-2" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
              <div className="relative bg-white">
                <p className={`text-sm text-gray-700 ${expandedContactId === contact.id ? '' : 'line-clamp-2'}`}>
                  {contact.message}
                </p>
                {contact.message.length > 100 && !expandedContactId && (
                  <div className="absolute bottom-0 right-0 left-1/2 bg-gradient-to-l from-white via-white">
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="p-0 h-6 text-xs text-[#283593] hover:text-[#1a237e] hover:bg-transparent"
                      onClick={() => toggleExpandMessage(contact.id)}
                    >
                      Ver mensagem
                    </Button>
                  </div>
                )}
                {expandedContactId === contact.id && (
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="p-0 h-6 text-xs text-[#283593] hover:text-[#1a237e] hover:bg-transparent mt-1"
                    onClick={() => toggleExpandMessage(contact.id)}
                  >
                    Ocultar mensagem
                  </Button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {contact.createdAt ? formatDistanceToNow(new Date(contact.createdAt), { 
                  addSuffix: true,
                  locale: ptBR 
                }) : "Data desconhecida"}
              </p>
            </div>
            <div className="ml-2 flex flex-row sm:flex-col sm:ml-4 space-x-2 sm:space-x-0 sm:space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#283593] hover:text-[#1a237e] hover:bg-[#283593]/10 p-1 sm:p-2"
                onClick={(e) => goToContactDetails(e, contact.id)}
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline sm:ml-1">Detalhes</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#283593] hover:text-[#1a237e] hover:bg-[#283593]/10 p-1 sm:p-2"
                onClick={() => toggleExpandMessage(contact.id)}
              >
                <MessagesSquare className="h-4 w-4" />
                <span className="hidden sm:inline sm:ml-1">
                  {expandedContactId === contact.id ? "Ocultar" : "Expandir"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Componente para exibir o status do contato como um badge
interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className={`rounded-full px-3 py-1 bg-amber-50 text-amber-700 border-amber-200 ${className}`}>
          <Clock className="h-3 w-3 mr-1" />
          Pendente
        </Badge>
      );
    case "in-progress":
      return (
        <Badge variant="outline" className={`rounded-full px-3 py-1 bg-blue-50 text-blue-700 border-blue-200 ${className}`}>
          <RefreshCcw className="h-3 w-3 mr-1" />
          Andamento
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className={`rounded-full px-3 py-1 bg-green-50 text-green-700 border-green-200 ${className}`}>
          <CheckCircle className="h-3 w-3 mr-1" />
          Concluído
        </Badge>
      );
    default:
      return null;
  }
};

// Página de todos os contatos
const AdminContacts = () => {
  const [location, navigate] = useLocation();
  
  // Função para determinar qual aba deve estar ativa com base na URL
  const determineFilter = (): "all" | "pending" | "in-progress" | "completed" => {
    // Caso não tenha estado, verificar pela URL
    if (location.includes("/contacts/pending")) return "pending";
    if (location.includes("/contacts/in-progress")) return "in-progress";
    if (location.includes("/contacts/completed")) return "completed";
    return "all"; // Padrão para qualquer outra URL (incluindo /admin/contacts)
  };
  
  // Estado para controlar qual lista mostrar
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">(
    determineFilter()
  );
  
  // Atualizar o filtro quando a localização mudar
  useEffect(() => {
    setFilter(determineFilter());
  }, [location]);
  
  // Manipulador de clique para as abas
  const handleTabClick = (tab: "all" | "pending" | "in-progress" | "completed") => {
    setFilter(tab);
    
    // Não vamos mais alterar a URL, apenas o estado
    // Isso evita o problema de páginas não encontradas
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Contatos</h2>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="flex overflow-x-auto scrollbar-hide border-b">
          <button 
            onClick={() => handleTabClick("all")}
            className={`px-4 sm:px-6 py-3 text-sm font-medium transition-colors duration-200 relative whitespace-nowrap ${
              filter === "all" 
                ? "bg-white text-[#283593] border-b-2 border-[#283593]" 
                : "text-gray-600 hover:text-[#283593] hover:bg-gray-50"
            }`}
          >
            Todos
          </button>
          <button 
            onClick={() => handleTabClick("pending")}
            className={`px-4 sm:px-6 py-3 text-sm font-medium transition-colors duration-200 relative whitespace-nowrap ${
              filter === "pending" 
                ? "bg-white text-amber-600 border-b-2 border-amber-500" 
                : "text-gray-600 hover:text-amber-600 hover:bg-gray-50"
            }`}
          >
            Pendentes
          </button>
          <button 
            onClick={() => handleTabClick("in-progress")}
            className={`px-4 sm:px-6 py-3 text-sm font-medium transition-colors duration-200 relative whitespace-nowrap ${
              filter === "in-progress" 
                ? "bg-white text-blue-600 border-b-2 border-blue-500" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            Em andamento
          </button>
          <button 
            onClick={() => handleTabClick("completed")}
            className={`px-4 sm:px-6 py-3 text-sm font-medium transition-colors duration-200 relative whitespace-nowrap ${
              filter === "completed" 
                ? "bg-white text-green-600 border-b-2 border-green-500" 
                : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
            }`}
          >
            Concluídos
          </button>
        </div>
      </div>
      
      {/* Renderizar a lista de contatos com o filtro atual */}
      <AdminContactsList filter={filter} />
    </div>
  );
};

// Skeleton para tabela de contatos
const ContactsTableSkeleton = () => {
  return (
    <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nome</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contato</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Mensagem</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Data</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row} className="animate-pulse">
                <td className="px-4 py-4">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 w-full max-w-xs bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-4">
                  <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex flex-row justify-end space-x-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Skeleton para cartões de contatos mobile
const ContactsCardsSkeleton = () => {
  return (
    <div className="md:hidden space-y-4">
      {[1, 2, 3].map((card) => (
        <div key={card} className="bg-white shadow rounded-lg p-4 animate-pulse">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-20 w-full bg-gray-200 rounded my-3"></div>
          <div className="flex justify-between items-center mt-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Lista de contatos com filtro
interface AdminContactsListProps {
  filter: "all" | "pending" | "in-progress" | "completed";
}

// Componente de Modal de Contato
interface ContactModalProps {
  contact: any;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: number, status: string) => void;
  onReadStatusChange: (id: number, isRead: boolean) => void;
}

const ContactDetailModal: React.FC<ContactModalProps> = ({ 
  contact, 
  isOpen, 
  onClose, 
  onStatusChange, 
  onReadStatusChange 
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(!isOpen);
  
  useEffect(() => {
    if (isOpen) {
      setAnimationComplete(false);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setAnimationComplete(true);
      onClose();
    }, 300);
  };
  
  if (!isOpen && animationComplete) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={handleClose}
    >
      <div 
        className={`bg-white shadow-lg w-full max-w-md transition-transform duration-300 ease-in-out transform h-full overflow-hidden
          ${isClosing ? 'translate-x-full' : 'translate-x-0'}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isOpen && !isClosing ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="border-b p-4 flex justify-between items-center bg-[#283593] text-white">
            <h2 className="text-xl font-semibold">Detalhes do Contato</h2>
            <button 
              onClick={handleClose}
              className="text-white hover:bg-[#1a237e] p-1 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="overflow-auto flex-1 p-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{contact.name}</h3>
                  <p className="text-gray-500 text-sm">{
                    contact.createdAt ? formatDistanceToNow(new Date(contact.createdAt), { 
                      addSuffix: true,
                      locale: ptBR 
                    }) : "Data desconhecida"
                  }</p>
                </div>
                
                <div>
                  <StatusBadge status={contact.status} className="ml-2" />
                </div>
              </div>
              
              <div className="border-t border-b py-3 mb-4">
                <div className="flex items-center mb-2">
                  <Mail className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 break-all">{contact.email}</span>
                </div>
                
                {contact.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{contact.phone}</span>
                    <button
                      onClick={() => openWhatsApp(contact.phone)}
                      className="ml-2 text-green-600 hover:text-green-700 flex-shrink-0"
                      title="Abrir WhatsApp"
                    >
                      <FaWhatsapp size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Mensagem</h4>
                <div className="p-4 bg-gray-50 rounded-md whitespace-pre-line break-words">
                  {contact.message}
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Status do Contato</h4>
              <div className="flex flex-col space-y-2 mb-6">
                <Button 
                  variant={contact.status === "pending" ? "default" : "outline"} 
                  size="sm" 
                  className={contact.status === "pending" ? "bg-amber-500 hover:bg-amber-600" : "text-amber-500 border-amber-500 hover:bg-amber-50"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(contact.id, "pending");
                  }}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Pendente
                </Button>
                <Button 
                  variant={contact.status === "in-progress" ? "default" : "outline"} 
                  size="sm" 
                  className={contact.status === "in-progress" ? "bg-blue-500 hover:bg-blue-600" : "text-blue-500 border-blue-500 hover:bg-blue-50"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(contact.id, "in-progress");
                  }}
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Em andamento
                </Button>
                <Button 
                  variant={contact.status === "completed" ? "default" : "outline"} 
                  size="sm" 
                  className={contact.status === "completed" ? "bg-green-500 hover:bg-green-600" : "text-green-500 border-green-500 hover:bg-green-50"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(contact.id, "completed");
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Concluído
                </Button>
              </div>
              
              <h4 className="text-sm font-medium text-gray-500 mb-3">Ações</h4>
              <div className="flex space-x-2">
                <Button 
                  variant={contact.isRead ? "outline" : "default"} 
                  size="sm"
                  className={!contact.isRead ? "bg-blue-500 hover:bg-blue-600" : "text-blue-500 border-blue-500 hover:bg-blue-50"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onReadStatusChange(contact.id, contact.isRead);
                  }}
                >
                  {contact.isRead ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Marcar como não lido
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Marcar como lido
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminContactsList: React.FC<AdminContactsListProps> = ({ filter }) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedContactId, setExpandedContactId] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  
  // Função para expandir ou colapsar a mensagem
  const toggleExpandMessage = (contactId: number) => {
    setExpandedContactId(expandedContactId === contactId ? null : contactId);
  };
  
  // Função para abrir o modal com os detalhes do contato
  const openContactModal = (contact: any) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    let url = "/api/admin/contacts";
    if (filter !== "all") {
      url = `/api/admin/contacts/status/${filter}`;
    }
    
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // Adicionar um pequeno delay para tornar a transição mais suave
        setTimeout(() => {
          setContacts(data);
          setLoading(false);
        }, 300);
      })
      .catch(err => {
        console.error(`Erro ao buscar contatos com filtro ${filter}:`, err);
        toast({
          title: "Erro ao carregar contatos",
          description: "Ocorreu um erro ao buscar os contatos. Tente novamente mais tarde.",
          variant: "destructive"
        });
        setLoading(false);
      });
  }, [filter, toast]);
  
  const updateContactStatus = (id: number, status: string) => {
    // Exibir um indicador de carregamento para ações específicas
    const contactToUpdate = contacts.find(c => c.id === id);
    if (contactToUpdate) {
      setContacts(prev => 
        prev.map(c => c.id === id ? { ...c, isStatusUpdating: true } : c)
      );
      
      // Atualizar também o contato selecionado se estiver aberto no modal
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({
          ...selectedContact,
          status,
          isStatusUpdating: true
        });
      }
    }
    
    fetch(`/api/admin/contacts/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Falha ao atualizar status");
        return res.json();
      })
      .then(updatedContact => {
        // Atualizar a lista de contatos
        setContacts(prevContacts => 
          prevContacts.map(contact => 
            contact.id === id ? { ...contact, status: updatedContact.status, isStatusUpdating: false } : contact
          )
        );
        
        // Atualizar o contato selecionado se estiver aberto no modal
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact({
            ...selectedContact,
            status: updatedContact.status,
            isStatusUpdating: false
          });
        }
        
        toast({
          title: "Status atualizado",
          description: `Contato marcado como "${status === "pending" ? "Pendente" : status === "in-progress" ? "Em andamento" : "Concluído"}"`,
          variant: "default",
        });
      })
      .catch(error => {
        console.error("Erro ao atualizar status:", error);
        setContacts(prev => 
          prev.map(c => c.id === id ? { ...c, isStatusUpdating: false } : c)
        );
        
        // Restaurar o estado original do contato selecionado em caso de erro
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact({
            ...selectedContact,
            isStatusUpdating: false
          });
        }
        
        toast({
          title: "Erro ao atualizar status",
          description: "Não foi possível atualizar o status do contato. Tente novamente.",
          variant: "destructive",
        });
      });
  };
  
  // Função para alternar entre lido/não lido
  const toggleReadStatus = (id: number, currentIsRead: boolean) => {
    // Exibir um indicador de carregamento para ações específicas
    setContacts(prev => 
      prev.map(c => c.id === id ? { ...c, isReadUpdating: true } : c)
    );
    
    // Atualizar também o contato selecionado se estiver aberto no modal
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact({
        ...selectedContact,
        isRead: !currentIsRead,
        isReadUpdating: true
      });
    }
    
    fetch(`/api/admin/contacts/${id}/read-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isRead: !currentIsRead }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Falha ao atualizar estado de leitura");
        return res.json();
      })
      .then(updatedContact => {
        // Atualizar a lista de contatos
        setContacts(prevContacts => 
          prevContacts.map(contact => 
            contact.id === id ? { ...contact, isRead: updatedContact.isRead, isReadUpdating: false } : contact
          )
        );
        
        // Atualizar o contato selecionado se estiver aberto no modal
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact({
            ...selectedContact,
            isRead: updatedContact.isRead,
            isReadUpdating: false
          });
        }
        
        toast({
          title: "Estado de leitura atualizado",
          description: `Contato marcado como "${!currentIsRead ? 'lido' : 'não lido'}"`,
          variant: "default",
        });
      })
      .catch(error => {
        console.error("Erro ao atualizar estado de leitura:", error);
        setContacts(prev => 
          prev.map(c => c.id === id ? { ...c, isReadUpdating: false } : c)
        );
        
        // Restaurar o estado original do contato selecionado em caso de erro
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact({
            ...selectedContact,
            isReadUpdating: false
          });
        }
        
        toast({
          title: "Erro ao atualizar estado de leitura",
          description: "Não foi possível atualizar o estado de leitura do contato. Tente novamente.",
          variant: "destructive",
        });
      });
  };
  
  if (loading) {
    return (
      <>
        <ContactsTableSkeleton />
        <ContactsCardsSkeleton />
      </>
    );
  }
  
  if (contacts.length === 0) {
    return (
      <div className="py-20 text-center">
        <Inbox className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Nenhum contato encontrado para este filtro.</p>
      </div>
    );
  }
  
  return (
    <>
      {/* Versão para desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nome</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contato</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Mensagem</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr 
                  key={contact.id} 
                  className={`hover:bg-gray-50 ${!contact.isRead ? 'bg-blue-50' : ''} cursor-pointer`}
                  onClick={() => openContactModal(contact)}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      {!contact.isRead && (
                        <div className="ml-2 w-2 h-2 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{contact.email}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      {contact.phone}
                      {contact.phone && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openWhatsApp(contact.phone);
                          }}
                          className="ml-2 text-green-600 hover:text-green-700"
                          title="Abrir WhatsApp"
                        >
                          <FaWhatsapp size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative max-w-xs">
                      <div className="text-sm text-gray-700 line-clamp-2">
                        {contact.message}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {contact.createdAt ? formatDistanceToNow(new Date(contact.createdAt), { 
                        addSuffix: true,
                        locale: ptBR 
                      }) : "Data desconhecida"}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={contact.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="flex flex-row justify-end space-x-2">
                      <Button 
                        variant={contact.status === "pending" ? "default" : "outline"} 
                        size="sm" 
                        className={contact.status === "pending" ? "bg-amber-500 hover:bg-amber-600 rounded-full" : "text-amber-500 border-amber-500 hover:bg-amber-50 rounded-full"}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateContactStatus(contact.id, "pending");
                        }}
                        title="Marcar como pendente"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="hidden lg:inline">Pendente</span>
                      </Button>
                      <Button 
                        variant={contact.status === "in-progress" ? "default" : "outline"} 
                        size="sm" 
                        className={contact.status === "in-progress" ? "bg-blue-500 hover:bg-blue-600 rounded-full" : "text-blue-500 border-blue-500 hover:bg-blue-50 rounded-full"}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateContactStatus(contact.id, "in-progress");
                        }}
                        title="Marcar como em andamento"
                      >
                        <RefreshCcw className="h-4 w-4 mr-1" />
                        <span className="hidden lg:inline">Andamento</span>
                      </Button>
                      <Button 
                        variant={contact.status === "completed" ? "default" : "outline"} 
                        size="sm" 
                        className={contact.status === "completed" ? "bg-green-500 hover:bg-green-600 rounded-full" : "text-green-500 border-green-500 hover:bg-green-50 rounded-full"}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateContactStatus(contact.id, "completed");
                        }}
                        title="Marcar como concluído"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span className="hidden lg:inline">Concluído</span>
                      </Button>
                    </div>
                    <div className="mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-primary border-primary hover:bg-primary/10 w-full rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleReadStatus(contact.id, contact.isRead);
                        }}
                        disabled={contact.isReadUpdating}
                      >
                        {contact.isReadUpdating ? (
                          <>
                            <div className="animate-spin mr-1 h-4 w-4 border-2 border-primary border-r-transparent rounded-full" />
                            Atualizando...
                          </>
                        ) : contact.isRead ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-1" />
                            Marcar como não lido
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            Marcar como lido
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Versão mobile */}
      <div className="md:hidden space-y-4">
        {contacts.map((contact) => (
          <Card 
            key={contact.id} 
            className={`overflow-hidden ${!contact.isRead ? 'border-l-4 border-l-blue-500' : ''} cursor-pointer`}
            onClick={() => openContactModal(contact)}
          >
            <CardContent className="p-0">
              <div className="px-4 py-3 flex items-center justify-between border-b">
                <div className="flex items-center">
                  <div className="font-medium text-gray-900">{contact.name}</div>
                  {!contact.isRead && (
                    <div className="ml-2 w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <StatusBadge status={contact.status} />
              </div>
              
              <div className="px-4 py-2 border-b">
                <div className="text-sm">{contact.email}</div>
                <div className="text-sm text-gray-500 flex items-center">
                  {contact.phone}
                  {contact.phone && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openWhatsApp(contact.phone);
                      }}
                      className="ml-2 text-green-600 hover:text-green-700 flex items-center"
                      title="Abrir WhatsApp"
                    >
                      <FaWhatsapp size={16} />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="px-4 py-3 border-b bg-gray-50">
                <div className="relative">
                  <p className={`text-sm ${expandedContactId === contact.id ? '' : 'line-clamp-2'}`}>
                    {contact.message}
                  </p>
                  {contact.message.length > 80 && (
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="mt-1 h-6 p-0 text-xs text-[#283593] hover:text-[#1a237e] hover:bg-transparent"
                      onClick={() => toggleExpandMessage(contact.id)}
                    >
                      {expandedContactId === contact.id ? "Mostrar menos" : "Visualizar mensagem completa"}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="px-4 py-2 border-b text-xs text-gray-500">
                {contact.createdAt ? formatDistanceToNow(new Date(contact.createdAt), { 
                  addSuffix: true,
                  locale: ptBR 
                }) : "Data desconhecida"}
              </div>
              
              <div className="p-3 flex flex-wrap justify-between gap-2 bg-gray-50">
                <Button 
                  variant={contact.status === "pending" ? "default" : "outline"} 
                  size="sm" 
                  className={contact.status === "pending" ? "bg-amber-500 hover:bg-amber-600 rounded-full flex-1" : "text-amber-500 border-amber-500 hover:bg-amber-50 rounded-full flex-1"}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateContactStatus(contact.id, "pending");
                  }}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Pendente
                </Button>
                <Button 
                  variant={contact.status === "in-progress" ? "default" : "outline"} 
                  size="sm" 
                  className={contact.status === "in-progress" ? "bg-blue-500 hover:bg-blue-600 rounded-full flex-1" : "text-blue-500 border-blue-500 hover:bg-blue-50 rounded-full flex-1"}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateContactStatus(contact.id, "in-progress");
                  }}
                >
                  <RefreshCcw className="h-4 w-4 mr-1" />
                  Andamento
                </Button>
                <Button 
                  variant={contact.status === "completed" ? "default" : "outline"} 
                  size="sm" 
                  className={contact.status === "completed" ? "bg-green-500 hover:bg-green-600 rounded-full flex-1" : "text-green-500 border-green-500 hover:bg-green-50 rounded-full flex-1"}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateContactStatus(contact.id, "completed");
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Concluído
                </Button>
              </div>
              
              <div className="p-3 bg-white border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-primary border-primary hover:bg-primary/10 w-full rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReadStatus(contact.id, contact.isRead);
                  }}
                  disabled={contact.isReadUpdating}
                >
                  {contact.isReadUpdating ? (
                    <>
                      <div className="animate-spin mr-1 h-4 w-4 border-2 border-primary border-r-transparent rounded-full" />
                      Atualizando...
                    </>
                  ) : contact.isRead ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-1" />
                      Marcar como não lido
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      Marcar como lido
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Modal de detalhes do contato */}
      {selectedContact && (
        <ContactDetailModal 
          contact={selectedContact} 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setTimeout(() => setSelectedContact(null), 300); // Limpa o contato depois da animação
          }}
          onStatusChange={updateContactStatus}
          onReadStatusChange={toggleReadStatus}
        />
      )}
    </>
  );
};

// Esquema de validação para criação de usuário
const createUserSchema = z.object({
  username: z.string()
    .min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
    .max(50, "Nome de usuário deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Nome de usuário deve conter apenas letras, números e underscores"),
  name: z.string()
    .min(3, "Nome completo deve ter pelo menos 3 caracteres")
    .max(100, "Nome completo deve ter no máximo 100 caracteres"),
  password: z.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

// Skeleton para a tabela de usuários
const UsersTableSkeleton = () => {
  return (
    <div className="border rounded-lg overflow-hidden animate-pulse">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left">
              <div className="h-4 w-8 bg-gray-200 rounded"></div>
            </th>
            <th className="px-4 py-3 text-left">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </th>
            <th className="px-4 py-3 text-left">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </th>
            <th className="px-4 py-3 text-left">
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
            </th>
            <th className="px-4 py-3 text-right">
              <div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map(row => (
            <tr key={row} className="border-t">
              <td className="px-4 py-3">
                <div className="h-5 w-8 bg-gray-200 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end space-x-2">
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Página de configurações
const AdminSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true); // Iniciamos com true para mostrar o skeleton
  const [users, setUsers] = useState<{id: number, username: string, name: string}[]>([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  
  // Estados para o modal de edição
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<{id: number, username: string, name: string} | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Buscar usuários existentes
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        // Adicionar um pequeno delay para exibir o skeleton
        setTimeout(() => {
          setUsers(data);
          setIsLoading(false);
        }, 300);
      } else {
        setIsLoading(false);
        toast({
          title: 'Erro ao carregar usuários',
          description: 'Não foi possível buscar a lista de usuários.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setIsLoading(false);
      toast({
        title: 'Erro ao carregar usuários',
        description: 'Ocorreu um problema ao carregar os usuários.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Formulário para criar novo usuário
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Função para criar um novo usuário
  const onSubmit = async (data: CreateUserFormValues) => {
    setIsLoading(true);
    setSuccessMessage('');
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          name: data.name,
          password: data.password,
        }),
      });

      if (response.ok) {
        const newUser = await response.json();
        
        // Atualizar a lista de usuários
        setUsers(prev => [...prev, {
          id: newUser.id,
          username: newUser.username,
          name: newUser.name
        }]);
        
        // Limpar o formulário
        form.reset();
        
        // Exibir mensagem de sucesso
        setSuccessMessage(`Usuário ${data.username} criado com sucesso!`);
        
        toast({
          title: 'Usuário criado com sucesso!',
          description: `O usuário ${data.username} foi criado com permissões de administrador.`,
          variant: 'default',
        });
        
        // Esconder o formulário
        setShowUserForm(false);
      } else {
        const errorData = await response.json();
        toast({
          title: 'Erro ao criar usuário',
          description: errorData.message || 'Ocorreu um erro ao criar o usuário. Tente novamente.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Esquema de validação para o formulário de edição de usuário
  const editUserSchema = z.object({
    name: z.string()
      .min(3, "Nome completo deve ter pelo menos 3 caracteres")
      .max(100, "Nome completo deve ter no máximo 100 caracteres"),
    password: z.string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .max(100, "Senha deve ter no máximo 100 caracteres")
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string()
      .optional()
      .or(z.literal('')),
  }).refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
  
  // Tipo para o valor do formulário de edição de usuário
  type EditUserFormValues = z.infer<typeof editUserSchema>;
  
  // Configuração do formulário de edição de usuário
  const editForm = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
    }
  });
  
  // Função para abrir o formulário de edição
  const handleEditUser = (user: {id: number, username: string, name: string}) => {
    setEditingUser(user);
    editForm.reset({
      name: user.name,
      password: '',
      confirmPassword: '',
    });
    setShowEditModal(true);
  };
  
  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingUser(null);
    editForm.reset();
  };
  
  // Função para salvar a edição do usuário
  const onEditSubmit = async (data: EditUserFormValues) => {
    if (!editingUser) return;
    
    setIsEditing(true);
    
    try {
      const updateData: {name?: string, password?: string} = {};
      if (data.name) updateData.name = data.name;
      if (data.password) updateData.password = data.password;
      
      const response = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        
        // Atualizar a lista de usuários
        setUsers(prev => prev.map(user => 
          user.id === editingUser.id ? { ...user, name: updatedUser.name } : user
        ));
        
        // Fechar o modal
        setShowEditModal(false);
        setEditingUser(null);
        
        // Exibir mensagem de sucesso
        toast({
          title: 'Usuário atualizado',
          description: `Os dados do usuário ${editingUser.username} foram atualizados com sucesso.`,
          variant: 'default',
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Erro ao atualizar usuário',
          description: errorData.message || 'Ocorreu um erro ao atualizar o usuário. Tente novamente.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsEditing(false);
    }
  };
  
  // Função para excluir um usuário
  const handleDeleteUser = async (userId: number, username: string) => {
    // Confirmação antes de excluir
    if (!window.confirm(`Tem certeza que deseja excluir o usuário ${username}? Esta ação não pode ser desfeita.`)) {
      return;
    }
    
    setDeletingUserId(userId);
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remover usuário da lista local
        setUsers(prev => prev.filter(user => user.id !== userId));
        
        // Exibir mensagem de sucesso
        toast({
          title: 'Usuário excluído',
          description: `O usuário ${username} foi excluído com sucesso.`,
          variant: 'default',
        });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Erro ao excluir usuário',
          description: errorData.message || 'Ocorreu um erro ao excluir o usuário. Tente novamente.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Configurações</h2>
      
      {/* Gerenciamento de Usuários Administradores */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl">Gerenciar Usuários</CardTitle>
            <CardDescription>
              Crie e gerencie usuários administradores do sistema
            </CardDescription>
          </div>
          <Button 
            onClick={() => setShowUserForm(!showUserForm)} 
            className="bg-[#1a237e] hover:bg-[#303f9f]"
          >
            {showUserForm ? <X className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
            {showUserForm ? "Cancelar" : "Novo Usuário"}
          </Button>
        </CardHeader>
        
        <CardContent>
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
              <Check className="h-5 w-5 mr-2" />
              {successMessage}
            </div>
          )}
          
          {showUserForm && (
            <Card className="mb-6 border-dashed border-2">
              <CardHeader>
                <CardTitle className="text-lg">Criar Novo Usuário Administrador</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome de Usuário</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Digite o nome de usuário" 
                              {...field} 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Digite o nome completo" 
                              {...field} 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Digite a senha" 
                                {...field} 
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmar Senha</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Confirme a senha" 
                                {...field} 
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-[#1a237e] hover:bg-[#303f9f]"
                        disabled={isLoading}
                      >
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        {isLoading ? "Criando..." : "Criar Usuário Administrador"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Usuários Existentes</h3>
            
            {isLoading ? (
              <UsersTableSkeleton />
            ) : users.length === 0 ? (
              <p className="text-gray-500">Nenhum usuário encontrado além do seu.</p>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id} className={`${user.id === 1 ? "bg-gray-50" : ""} ${deletingUserId === user.id ? "opacity-50" : ""}`}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Badge className="bg-[#1a237e]">Administrador</Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleEditUser(user)}
                              disabled={deletingUserId === user.id || isEditing}
                            >
                              {isEditing && editingUser?.id === user.id ? (
                                <svg className="animate-spin -ml-1 mr-1 h-3.5 w-3.5 text-[#1a237e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <Edit className="h-3.5 w-3.5 mr-1" />
                              )}
                              {isEditing && editingUser?.id === user.id ? "Salvando..." : "Editar"}
                            </Button>
                            
                            {user.id !== 1 && (
                              <Button
                                variant="destructive"
                                size="sm"
                                className="text-xs"
                                onClick={() => handleDeleteUser(user.id, user.username)}
                                disabled={deletingUserId === user.id || (isEditing && editingUser?.id === user.id)}
                              >
                                {deletingUserId === user.id ? (
                                  <>
                                    <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Excluindo...
                                  </>
                                ) : (
                                  <>
                                    <X className="h-3.5 w-3.5 mr-1" />
                                    Excluir
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Preferências de Email */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Preferências de Email</CardTitle>
          <CardDescription>
            Configure como e quando você deseja receber notificações por email sobre novos contatos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">Este recurso estará disponível em breve.</p>
        </CardContent>
      </Card>
      
      {/* Redefinição de Senha */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>
            Gerencie as configurações de segurança da sua conta de administrador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">Para redefinir sua senha, utilize o link abaixo:</p>
          <Button variant="outline">
            <Key className="mr-2 h-4 w-4" />
            Redefinir Senha
          </Button>
        </CardContent>
      </Card>
      
      {/* Modal de edição de usuário */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Editar Usuário</h3>
              <button 
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <Form {...editForm}>
                <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Nome de Usuário</p>
                    <p className="text-base font-medium">{editingUser.username}</p>
                    <p className="text-xs text-gray-500 mt-1">O nome de usuário não pode ser alterado</p>
                  </div>
                  
                  <FormField
                    control={editForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Digite o nome completo" 
                            {...field} 
                            disabled={isEditing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={editForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nova Senha</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Nova senha (opcional)" 
                              {...field} 
                              disabled={isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar Senha</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Confirme a nova senha" 
                              {...field} 
                              disabled={isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      disabled={isEditing}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#1a237e] hover:bg-[#303f9f]"
                      disabled={isEditing}
                    >
                      {isEditing ? (
                        <>
                          <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
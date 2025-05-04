import { useState, useEffect } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
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
  LogOut,
  Eye,
  MessageSquare
} from "lucide-react";

// Componente principal do painel administrativo
const Admin = () => {
  const [, navigate] = useLocation();
  const [matchesDashboard] = useRoute("/admin");
  const [matchesContacts] = useRoute("/admin/contacts");
  const [matchesContactsAll] = useRoute("/admin/contacts/all");
  const [matchesContactsPending] = useRoute("/admin/contacts/pending");
  const [matchesContactsInProgress] = useRoute("/admin/contacts/in-progress");
  const [matchesContactsCompleted] = useRoute("/admin/contacts/completed");
  const [matchesSettings] = useRoute("/admin/settings");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determinar a guia ativa com base na URL
  const getActiveTab = () => {
    if (matchesDashboard) return "dashboard";
    if (matchesContacts || matchesContactsAll || matchesContactsPending || 
        matchesContactsInProgress || matchesContactsCompleted) return "contacts";
    if (matchesSettings) return "settings";
    return "dashboard";
  };

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
            {matchesDashboard && <AdminDashboard />}
            {matchesContacts && <AdminContacts />}
            {matchesContactsAll && <AdminContactsList filter="all" />}
            {matchesContactsPending && <AdminContactsList filter="pending" />}
            {matchesContactsInProgress && <AdminContactsList filter="in-progress" />}
            {matchesContactsCompleted && <AdminContactsList filter="completed" />}
            {matchesSettings && <AdminSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};

// Componente de cabeçalho do painel administrativo
const AdminHeader = ({ toggleMobileMenu }: { toggleMobileMenu?: () => void }) => {
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
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span>Sair</span>
        </Button>
        <Button 
          variant="ghost" 
          className="text-gray-700 hover:bg-gray-100 sm:hidden"
          size="sm"
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
  
  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    if (toggleMobileMenu && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };
  
  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-6 py-4 bg-[#1a237e] border-b border-white/10 shadow-md">
        <div className="flex items-center mb-4">
          <img 
            src="/favicon.ico" 
            alt="CRC Faróis" 
            className="w-8 h-8 mr-2" 
          />
          <h2 className="text-xl font-bold text-white">CRC Faróis</h2>
        </div>
        <Button 
          variant="outline" 
          className="w-full text-white border-white hover:bg-white/20 focus:ring-white focus:ring-offset-[#1a237e]"
          onClick={() => window.location.href = "/"}
        >
          <HomeIcon className="h-4 w-4 mr-2" />
          Voltar ao site
        </Button>
      </div>
      
      {/* Links de navegação */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          <li>
            <a 
              href="/admin" 
              onClick={handleNavigation("/admin")}
              className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${activeTab === "dashboard" 
                ? "bg-white text-[#1a237e] font-semibold shadow-md" 
                : "text-white hover:bg-white/20"}`}
            >
              <ClipboardList className="h-5 w-5 mr-3" />
              Dashboard
            </a>
          </li>
          <li>
            <a 
              href="/admin/contacts" 
              onClick={handleNavigation("/admin/contacts")}
              className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${activeTab === "contacts" 
                ? "bg-white text-[#1a237e] font-semibold shadow-md" 
                : "text-white hover:bg-white/20"}`}
            >
              <Inbox className="h-5 w-5 mr-3" />
              Contatos
            </a>
          </li>
          <li>
            <a 
              href="/admin/settings"
              onClick={handleNavigation("/admin/settings")} 
              className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${activeTab === "settings" 
                ? "bg-white text-[#1a237e] font-semibold shadow-md" 
                : "text-white hover:bg-white/20"}`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Configurações
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Informações do usuário */}
      <div className="px-6 py-4 border-t border-white/10 bg-[#303f9f] shadow-inner">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center mr-3 shadow-md">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-white">Administrador</p>
            <p className="text-sm text-white/90">Logado agora</p>
          </div>
        </div>
      </div>
    </>
  );
  
  // Versão para desktop
  return (
    <>
      {/* Versão desktop */}
      <aside className="hidden md:flex w-64 bg-[#283593] text-white flex-col shadow-xl z-10">
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

// Dashboard - Página inicial do painel administrativo
const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    unread: 0
  });
  
  useEffect(() => {
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
      })
      .catch(err => console.error("Erro ao buscar estatísticas:", err));
  }, []);
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total de Contatos"
          value={counts.total}
          icon={<Inbox className="h-12 w-12 text-primary" />}
          linkText="Ver todos"
          linkUrl="/admin/contacts/all"
        />
        <DashboardCard 
          title="Pendentes"
          value={counts.pending}
          icon={<AlertCircle className="h-12 w-12 text-amber-500" />}
          linkText="Ver pendentes"
          linkUrl="/admin/contacts/pending"
          color="amber"
        />
        <DashboardCard 
          title="Em Andamento"
          value={counts.inProgress}
          icon={<RefreshCcw className="h-12 w-12 text-blue-500" />}
          linkText="Ver em andamento"
          linkUrl="/admin/contacts/in-progress"
          color="blue"
        />
        <DashboardCard 
          title="Concluídos"
          value={counts.completed}
          icon={<CheckCircle className="h-12 w-12 text-green-500" />}
          linkText="Ver concluídos"
          linkUrl="/admin/contacts/completed"
          color="green"
        />
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
          <RecentContactsList />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={() => window.location.href = "/admin/contacts"}>
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
  const getColorClass = () => {
    switch (color) {
      case "amber": return "text-amber-500 hover:text-amber-600";
      case "blue": return "text-blue-500 hover:text-blue-600";
      case "green": return "text-green-500 hover:text-green-600";
      default: return "text-primary hover:text-secondary";
    }
  };
  
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          {icon}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <a 
          href={linkUrl} 
          className={`inline-flex items-center text-sm font-medium ${getColorClass()}`}
        >
          {linkText}
          <ChevronRight className="h-4 w-4 ml-1" />
        </a>
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
  
  const goToContactDetails = (contactId: number) => {
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
              <div className="flex items-center mb-1">
                <h4 className="font-medium text-gray-900">{contact.name}</h4>
                {!contact.isRead && (
                  <Badge variant="default" className="ml-2 bg-[#283593] hover:bg-[#1a237e]">
                    Não lido
                  </Badge>
                )}
                <StatusBadge status={contact.status} className="ml-2" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
              <div className="relative">
                <p className={`text-sm text-gray-700 ${expandedContactId === contact.id ? '' : 'line-clamp-1'}`}>
                  {contact.message}
                </p>
                {contact.message.length > 100 && expandedContactId !== contact.id && (
                  <div className="absolute bottom-0 right-0 bg-gradient-to-l from-gray-50 via-gray-50 pl-2">
                    <button 
                      onClick={() => toggleExpandMessage(contact.id)}
                      className="text-xs font-medium text-[#283593] hover:text-[#1a237e]"
                    >
                      ver mais
                    </button>
                  </div>
                )}
                {expandedContactId === contact.id && (
                  <button 
                    onClick={() => toggleExpandMessage(contact.id)}
                    className="text-xs font-medium text-[#283593] hover:text-[#1a237e] mt-1"
                  >
                    ver menos
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {contact.createdAt ? formatDistanceToNow(new Date(contact.createdAt), { 
                  addSuffix: true,
                  locale: ptBR 
                }) : "Data desconhecida"}
              </p>
            </div>
            <div className="ml-4 flex flex-col space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#283593] hover:text-[#1a237e] hover:bg-[#283593]/10"
                onClick={() => goToContactDetails(contact.id)}
              >
                <Eye className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Detalhes</span>
              </Button>
              {!expandedContactId && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-[#283593] hover:text-[#1a237e] hover:bg-[#283593]/10"
                  onClick={() => toggleExpandMessage(contact.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Mensagem</span>
                </Button>
              )}
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
        <Badge variant="outline" className={`bg-amber-50 text-amber-700 border-amber-200 ${className}`}>
          <Clock className="h-3 w-3 mr-1" />
          Pendente
        </Badge>
      );
    case "in-progress":
      return (
        <Badge variant="outline" className={`bg-blue-50 text-blue-700 border-blue-200 ${className}`}>
          <RefreshCcw className="h-3 w-3 mr-1" />
          Em andamento
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className={`bg-green-50 text-green-700 border-green-200 ${className}`}>
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
  const [, navigate] = useLocation();
  const [matchesAll] = useRoute("/admin/contacts/all");
  const [matchesPending] = useRoute("/admin/contacts/pending");
  const [matchesInProgress] = useRoute("/admin/contacts/in-progress");
  const [matchesCompleted] = useRoute("/admin/contacts/completed");
  const [matchesRoot] = useRoute("/admin/contacts");
  
  const getActiveTab = () => {
    if (matchesAll) return "all";
    if (matchesPending) return "pending";
    if (matchesInProgress) return "in-progress";
    if (matchesCompleted) return "completed";
    return "all"; // Default 
  };
  
  const activeTab = getActiveTab();
  
  const handleTabClick = (tab: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/admin/contacts/${tab}`);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Contatos</h2>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="flex flex-wrap border-b">
          <button 
            onClick={handleTabClick("all")}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === "all" 
                ? "bg-white text-[#283593] border-b-2 border-[#283593]" 
                : "text-gray-600 hover:text-[#283593] hover:bg-gray-50"
            }`}
          >
            Todos
          </button>
          <button 
            onClick={handleTabClick("pending")}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === "pending" 
                ? "bg-white text-amber-600 border-b-2 border-amber-500" 
                : "text-gray-600 hover:text-amber-600 hover:bg-gray-50"
            }`}
          >
            Pendentes
          </button>
          <button 
            onClick={handleTabClick("in-progress")}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === "in-progress" 
                ? "bg-white text-blue-600 border-b-2 border-blue-500" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            Em andamento
          </button>
          <button 
            onClick={handleTabClick("completed")}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === "completed" 
                ? "bg-white text-green-600 border-b-2 border-green-500" 
                : "text-gray-600 hover:text-green-600 hover:bg-gray-50"
            }`}
          >
            Concluídos
          </button>
        </div>
      </div>
      
      {(matchesRoot || matchesAll) && <AdminContactsList filter="all" />}
      {matchesPending && <AdminContactsList filter="pending" />}
      {matchesInProgress && <AdminContactsList filter="in-progress" />}
      {matchesCompleted && <AdminContactsList filter="completed" />}
    </div>
  );
};

// Lista de contatos com filtro
interface AdminContactsListProps {
  filter: "all" | "pending" | "in-progress" | "completed";
}

const AdminContactsList: React.FC<AdminContactsListProps> = ({ filter }) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedContactId, setExpandedContactId] = useState<number | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    let url = "/api/admin/contacts";
    if (filter !== "all") {
      url = `/api/admin/contacts/status/${filter}`;
    }
    
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
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
        setContacts(prevContacts => 
          prevContacts.map(contact => 
            contact.id === id ? { ...contact, status: updatedContact.status } : contact
          )
        );
        
        toast({
          title: "Status atualizado",
          description: `Contato marcado como "${status === "pending" ? "Pendente" : status === "in-progress" ? "Em andamento" : "Concluído"}"`,
          variant: "default",
        });
      })
      .catch(error => {
        console.error("Erro ao atualizar status:", error);
        toast({
          title: "Erro ao atualizar status",
          description: "Não foi possível atualizar o status do contato. Tente novamente.",
          variant: "destructive",
        });
      });
  };
  
  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <p className="text-gray-500">Carregando contatos...</p>
      </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Mensagem</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className={`hover:bg-gray-50 ${!contact.isRead ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        {!contact.isRead && (
                          <Badge variant="default" className="mt-1 text-xs bg-[#283593] hover:bg-[#1a237e]">
                            Não lido
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{contact.email}</div>
                    <div className="text-sm text-gray-500">{contact.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 max-w-xs truncate">{contact.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {contact.createdAt ? formatDistanceToNow(new Date(contact.createdAt), { 
                        addSuffix: true,
                        locale: ptBR 
                      }) : "Data desconhecida"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={contact.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button 
                        variant={contact.status === "pending" ? "default" : "outline"} 
                        size="sm" 
                        className={contact.status === "pending" ? "bg-amber-500 hover:bg-amber-600" : "text-amber-500 border-amber-500 hover:bg-amber-50"}
                        onClick={() => updateContactStatus(contact.id, "pending")}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Pendente
                      </Button>
                      <Button 
                        variant={contact.status === "in-progress" ? "default" : "outline"} 
                        size="sm" 
                        className={contact.status === "in-progress" ? "bg-blue-500 hover:bg-blue-600" : "text-blue-500 border-blue-500 hover:bg-blue-50"}
                        onClick={() => updateContactStatus(contact.id, "in-progress")}
                      >
                        <RefreshCcw className="h-4 w-4 mr-1" />
                        Andamento
                      </Button>
                      <Button 
                        variant={contact.status === "completed" ? "default" : "outline"} 
                        size="sm" 
                        className={contact.status === "completed" ? "bg-green-500 hover:bg-green-600" : "text-green-500 border-green-500 hover:bg-green-50"}
                        onClick={() => updateContactStatus(contact.id, "completed")}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Concluído
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
            className={`overflow-hidden ${!contact.isRead ? 'border-l-4 border-l-[#283593]' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  {!contact.isRead && (
                    <Badge variant="default" className="mt-1 text-xs bg-[#283593] hover:bg-[#1a237e]">
                      Não lido
                    </Badge>
                  )}
                </div>
                <StatusBadge status={contact.status} />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div>
                  <p className="text-gray-500">Email:</p>
                  <p className="text-gray-800 break-all">{contact.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Telefone:</p>
                  <p className="text-gray-800">{contact.phone}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-500 text-sm">Mensagem:</p>
                <div className="relative">
                  <p className="text-gray-800 text-sm">{contact.message}</p>
                  {/* Adicionar botão de ver mais em mensagens longas se necessário */}
                  {contact.message.length > 100 && (
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="mt-1 h-6 p-0 text-xs text-[#283593] hover:text-[#1a237e] hover:bg-transparent"
                      onClick={() => toggleExpandMessage(contact.id)}
                    >
                      Visualizar mensagem completa
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  {contact.createdAt ? formatDistanceToNow(new Date(contact.createdAt), { 
                    addSuffix: true,
                    locale: ptBR 
                  }) : "Data desconhecida"}
                </div>
                
                <div className="flex space-x-1">
                  <Button 
                    variant={contact.status === "pending" ? "default" : "outline"} 
                    size="sm" 
                    className={contact.status === "pending" ? "bg-amber-500 hover:bg-amber-600 px-2" : "text-amber-500 border-amber-500 hover:bg-amber-50 px-2"} 
                    onClick={() => updateContactStatus(contact.id, "pending")}
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={contact.status === "in-progress" ? "default" : "outline"} 
                    size="sm" 
                    className={contact.status === "in-progress" ? "bg-blue-500 hover:bg-blue-600 px-2" : "text-blue-500 border-blue-500 hover:bg-blue-50 px-2"}
                    onClick={() => updateContactStatus(contact.id, "in-progress")}
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={contact.status === "completed" ? "default" : "outline"} 
                    size="sm" 
                    className={contact.status === "completed" ? "bg-green-500 hover:bg-green-600 px-2" : "text-green-500 border-green-500 hover:bg-green-50 px-2"}
                    onClick={() => updateContactStatus(contact.id, "completed")}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

// Página de configurações
const AdminSettings = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Configurações</h2>
      
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
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>
            Gerencie as configurações de segurança da sua conta de administrador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">Este recurso estará disponível em breve.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
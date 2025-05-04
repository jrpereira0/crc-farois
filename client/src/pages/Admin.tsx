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
  LogOut
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

  // Determinar a guia ativa com base na URL
  const getActiveTab = () => {
    if (matchesDashboard) return "dashboard";
    if (matchesContacts || matchesContactsAll || matchesContactsPending || 
        matchesContactsInProgress || matchesContactsCompleted) return "contacts";
    if (matchesSettings) return "settings";
    return "dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar activeTab={getActiveTab()} />
      
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Barra superior */}
        <AdminHeader />
        
        {/* Conteúdo principal */}
        <main className="flex-1 overflow-y-auto py-4 px-6 bg-gray-100">
          {matchesDashboard && <AdminDashboard />}
          {matchesContacts && <AdminContacts />}
          {matchesContactsAll && <AdminContactsList filter="all" />}
          {matchesContactsPending && <AdminContactsList filter="pending" />}
          {matchesContactsInProgress && <AdminContactsList filter="in-progress" />}
          {matchesContactsCompleted && <AdminContactsList filter="completed" />}
          {matchesSettings && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};

// Componente de cabeçalho do painel administrativo
const AdminHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
      </div>
      <div className="flex items-center space-x-4">
        <SearchBar />
        <Button variant="ghost" className="text-darkgray hover:bg-gray-100">
          <LogOut className="h-5 w-5 mr-2" />
          Sair
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
const AdminSidebar = ({ activeTab }: { activeTab: string }) => {
  const [, navigate] = useLocation();
  
  return (
    <aside className="w-64 bg-darkblue text-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4 bg-secondary">
        <div className="flex items-center mb-4">
          <img 
            src="/favicon.ico" 
            alt="CRC Faróis" 
            className="w-8 h-8 mr-2" 
          />
          <h2 className="text-xl font-bold">CRC Faróis</h2>
        </div>
        <Button 
          variant="outline" 
          className="w-full text-white border-white hover:bg-white/10"
          onClick={() => navigate("/")}
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
              className={`flex items-center px-4 py-3 rounded-md hover:bg-white/10 ${activeTab === "dashboard" ? "bg-white/10 font-semibold" : ""}`}
            >
              <ClipboardList className="h-5 w-5 mr-3" />
              Dashboard
            </a>
          </li>
          <li>
            <a 
              href="/admin/contacts" 
              className={`flex items-center px-4 py-3 rounded-md hover:bg-white/10 ${activeTab === "contacts" ? "bg-white/10 font-semibold" : ""}`}
            >
              <Inbox className="h-5 w-5 mr-3" />
              Contatos
            </a>
          </li>
          <li>
            <a 
              href="/admin/settings" 
              className={`flex items-center px-4 py-3 rounded-md hover:bg-white/10 ${activeTab === "settings" ? "bg-white/10 font-semibold" : ""}`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Configurações
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Informações do usuário */}
      <div className="px-6 py-4 border-t border-white/10 bg-secondary/50">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Administrador</p>
            <p className="text-sm text-white/70">Logado agora</p>
          </div>
        </div>
      </div>
    </aside>
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
  
  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
        <div key={contact.id} className="py-4 flex items-start hover:bg-gray-50 px-4 rounded-md -mx-4">
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <h4 className="font-medium text-gray-900">{contact.name}</h4>
              {!contact.isRead && (
                <Badge variant="default" className="ml-2 bg-primary">
                  Não lido
                </Badge>
              )}
              <StatusBadge status={contact.status} className="ml-2" />
            </div>
            <p className="text-sm text-gray-600 truncate mb-1">{contact.email}</p>
            <p className="text-sm text-gray-500 line-clamp-1">{contact.message}</p>
            <p className="text-xs text-gray-400 mt-1">
              {contact.createdAt ? formatDistanceToNow(new Date(contact.createdAt), { 
                addSuffix: true,
                locale: ptBR 
              }) : "Data desconhecida"}
            </p>
          </div>
          <div>
            <Link href={`/admin/contacts/detail/${contact.id}`}>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
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
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Contatos</h2>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => navigate(`/admin/contacts/${value}`)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="in-progress">Em andamento</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <AdminContactsList filter="all" />
        </TabsContent>
        <TabsContent value="pending">
          <AdminContactsList filter="pending" />
        </TabsContent>
        <TabsContent value="in-progress">
          <AdminContactsList filter="in-progress" />
        </TabsContent>
        <TabsContent value="completed">
          <AdminContactsList filter="completed" />
        </TabsContent>
      </Tabs>
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
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensagem</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
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
                        <Badge variant="default" className="mt-1 text-xs bg-primary">
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
                  <div className="text-sm text-gray-500 max-w-xs truncate">{contact.message}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
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
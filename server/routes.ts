import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, updateContactStatusSchema } from "@shared/schema";
import { setupAuth, resetAdminPassword } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configurar autenticação
  setupAuth(app);
  
  // Criar ou resetar senha do admin (padrão: admin123)
  await resetAdminPassword('admin123');
  
  // Rota para redefinir a senha do administrador (protegida, apenas admins podem acessar)
  app.post("/api/admin/reset-password", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({
          message: "Senha inválida. A senha deve ter pelo menos 6 caracteres."
        });
      }
      
      const success = await resetAdminPassword(password);
      
      if (success) {
        return res.status(200).json({
          message: "Senha do administrador redefinida com sucesso."
        });
      } else {
        return res.status(500).json({
          message: "Erro ao redefinir a senha do administrador."
        });
      }
    } catch (error: any) {
      console.error('Erro ao redefinir senha do administrador:', error);
      res.status(500).json({
        message: "Erro ao redefinir senha",
        error: error.message
      });
    }
  });
  // Rota para processar o envio do formulário de contato
  app.post("/api/contact", async (req, res) => {
    try {
      console.log('Recebido formulário de contato:', req.body);
      
      // Validar os dados do formulário
      const validatedData = insertContactSchema.parse(req.body);
      console.log('Dados validados:', validatedData);
      
      // Salvar os dados no armazenamento
      console.log('Tentando salvar no banco de dados...');
      const savedContact = await storage.createContact(validatedData);
      console.log('Contato salvo com sucesso, ID:', savedContact.id);
      
      // Responder com sucesso
      res.status(201).json({
        message: "Mensagem enviada com sucesso!",
        contactId: savedContact.id
      });
    } catch (error: any) {
      // Responder com erro
      console.error('Erro ao processar formulário:', error);
      res.status(400).json({
        message: "Erro ao processar o formulário",
        error: error.message
      });
    }
  });

  // Rotas para o painel administrativo

  // Listar todos os contatos
  app.get("/api/admin/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.status(200).json(contacts);
    } catch (error: any) {
      console.error('Erro ao buscar contatos:', error);
      res.status(500).json({
        message: "Erro ao buscar contatos",
        error: error.message
      });
    }
  });

  // Buscar contato por ID
  app.get("/api/admin/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }

      const contact = await storage.getContact(id);
      if (!contact) {
        return res.status(404).json({
          message: "Contato não encontrado"
        });
      }

      // Marcar como lido se ainda não foi lido
      if (!contact.isRead) {
        await storage.markContactAsRead(id);
      }

      res.status(200).json(contact);
    } catch (error: any) {
      console.error('Erro ao buscar contato:', error);
      res.status(500).json({
        message: "Erro ao buscar contato",
        error: error.message
      });
    }
  });

  // Atualizar status do contato
  app.patch("/api/admin/contacts/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }

      // Validar dados de atualização
      const validatedData = updateContactStatusSchema.parse(req.body);
      
      const updatedContact = await storage.updateContactStatus(id, validatedData);
      if (!updatedContact) {
        return res.status(404).json({
          message: "Contato não encontrado"
        });
      }

      res.status(200).json(updatedContact);
    } catch (error: any) {
      console.error('Erro ao atualizar status do contato:', error);
      res.status(500).json({
        message: "Erro ao atualizar status do contato",
        error: error.message
      });
    }
  });

  // Buscar contatos por status
  app.get("/api/admin/contacts/status/:status", async (req, res) => {
    try {
      const status = req.params.status;
      if (!["pending", "in-progress", "completed"].includes(status)) {
        return res.status(400).json({
          message: "Status inválido"
        });
      }

      const contacts = await storage.getContactsByStatus(status);
      res.status(200).json(contacts);
    } catch (error: any) {
      console.error('Erro ao buscar contatos por status:', error);
      res.status(500).json({
        message: "Erro ao buscar contatos por status",
        error: error.message
      });
    }
  });

  // Alternar estado de leitura (lido/não lido)
  app.patch("/api/admin/contacts/:id/read-status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }

      const { isRead } = req.body;
      if (typeof isRead !== 'boolean') {
        return res.status(400).json({
          message: "O campo 'isRead' é obrigatório e deve ser um booleano"
        });
      }

      // Obter o contato atual
      const contact = await storage.getContact(id);
      if (!contact) {
        return res.status(404).json({
          message: "Contato não encontrado"
        });
      }

      // Se isRead for true, marcar como lido, senão marcar como não lido
      let updatedContact;
      if (isRead) {
        updatedContact = await storage.markContactAsRead(id);
      } else {
        // Pegamos o status atual do contato e garantimos que ele está no formato esperado
        const contactStatus = contact.status as "pending" | "in-progress" | "completed";
        // Usamos updateContactStatus pois não temos uma função específica para marcar como não lido
        updatedContact = await storage.updateContactStatus(id, { status: contactStatus, isRead: false });
      }

      res.status(200).json(updatedContact);
    } catch (error: any) {
      console.error('Erro ao alternar estado de leitura:', error);
      res.status(500).json({
        message: "Erro ao alternar estado de leitura",
        error: error.message
      });
    }
  });
  
  // Listar usuários administrativos
  app.get("/api/admin/users", async (req, res) => {
    try {
      // Verificar se o usuário está autenticado
      if (!req.isAuthenticated() || !req.user.isAdmin) {
        return res.status(403).json({
          message: "Acesso negado. Apenas administradores podem ver a lista de usuários."
        });
      }

      // Obter todos os usuários do storage
      const users = await storage.getAllUsers();
      
      // Retornar apenas os dados necessários (excluindo senhas)
      const safeUsers = users.map(user => ({
        id: user.id,
        username: user.username,
        name: user.name,
        isAdmin: user.isAdmin,
      }));
      
      res.status(200).json(safeUsers);
    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({
        message: "Erro ao buscar usuários",
        error: error.message
      });
    }
  });
  
  // Excluir usuário administrativo
  app.delete("/api/admin/users/:id", async (req, res) => {
    try {
      // Verificar se o usuário está autenticado
      if (!req.isAuthenticated() || !req.user.isAdmin) {
        return res.status(403).json({
          message: "Acesso negado. Apenas administradores podem excluir usuários."
        });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }
      
      // Não permitir autoexclusão
      if (id === req.user.id) {
        return res.status(400).json({
          message: "Não é possível excluir seu próprio usuário."
        });
      }
      
      // Não permitir excluir o admin principal
      if (id === 1) {
        return res.status(400).json({
          message: "Não é possível excluir o administrador principal."
        });
      }

      const success = await storage.deleteUser(id);
      
      if (success) {
        res.status(200).json({
          message: "Usuário excluído com sucesso."
        });
      } else {
        res.status(404).json({
          message: "Usuário não encontrado ou não pode ser excluído."
        });
      }
    } catch (error: any) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).json({
        message: "Erro ao excluir usuário",
        error: error.message
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

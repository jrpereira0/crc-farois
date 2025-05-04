import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}

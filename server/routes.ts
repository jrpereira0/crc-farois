import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rota para processar o envio do formulário de contato
  app.post("/api/contact", async (req, res) => {
    try {
      // Validar os dados do formulário
      const validatedData = insertContactSchema.parse(req.body);
      
      // Salvar os dados no armazenamento
      const savedContact = await storage.createContact(validatedData);
      
      // Responder com sucesso
      res.status(201).json({
        message: "Mensagem enviada com sucesso!",
        contactId: savedContact.id
      });
    } catch (error: any) {
      // Responder com erro
      res.status(400).json({
        message: "Erro ao processar o formulário",
        error: error.message
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

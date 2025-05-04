import { z } from "zod";
import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Definir schema de contato usando Drizzle ORM
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  emailSent: text("email_sent").default("pending"),
  status: text("status").default("pending").notNull(), // pending, in-progress, completed
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Schema para inserção usando Zod (simplificado)
export const insertContactSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  message: z.string().min(1, "Mensagem é obrigatória")
});

// Schema para atualização de status
export const updateContactStatusSchema = z.object({
  status: z.enum(["pending", "in-progress", "completed"]),
  isRead: z.boolean().optional()
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type UpdateContactStatus = z.infer<typeof updateContactStatusSchema>;
export type Contact = typeof contacts.$inferSelect;

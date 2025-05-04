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

// Definir schema de usuários usando Drizzle ORM
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  isAdmin: boolean("is_admin").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

// Schema para autenticação
export const loginSchema = z.object({
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

// Schema para registro de usuários
export const registerUserSchema = z.object({
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  name: z.string().min(1, "Nome é obrigatório"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type UpdateContactStatus = z.infer<typeof updateContactStatusSchema>;
export type Contact = typeof contacts.$inferSelect;
export type User = typeof users.$inferSelect;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterUser = z.infer<typeof registerUserSchema>;

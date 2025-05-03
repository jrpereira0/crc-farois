import { z } from "zod";

// Definir schema de contato diretamente com zod (sem dependência do PostgreSQL)
export const contactSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  message: z.string().min(1, "Mensagem é obrigatória"),
  createdAt: z.date()
});

export const insertContactSchema = contactSchema.omit({ id: true, createdAt: true });

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = z.infer<typeof contactSchema>;

// Definição simplificada de usuário (sem dependência do PostgreSQL)
export const userSchema = z.object({
  id: z.number(),
  username: z.string().min(1),
  password: z.string().min(1)
});

export const insertUserSchema = userSchema.omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof userSchema>;

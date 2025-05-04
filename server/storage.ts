import type { Contact, InsertContact, UpdateContactStatus, User, RegisterUser } from "@shared/schema";
import { contacts, users } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface de armazenamento com métodos necessários
// Interface para atualizar usuário
export interface UpdateUser {
  name?: string;
  password?: string;
}

export interface IStorage {
  // Métodos para contato
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contactData: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  updateContactStatus(id: number, statusData: UpdateContactStatus): Promise<Contact | undefined>;
  markContactAsRead(id: number): Promise<Contact | undefined>;
  getContactsByStatus(status: string): Promise<Contact[]>;
  
  // Métodos para usuários
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(userData: RegisterUser): Promise<User>;
  updateUser(id: number, userData: UpdateUser): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<boolean>;
}

// Armazenamento em banco de dados
export class DatabaseStorage implements IStorage {
  // Métodos de contato
  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    console.log('DatabaseStorage: recebendo dados para criar contato:', insertContact);
    try {
      const [contact] = await db.insert(contacts)
        .values({
          name: insertContact.name,
          email: insertContact.email,
          phone: insertContact.phone,
          message: insertContact.message
        })
        .returning();
        
      console.log('DatabaseStorage: contato criado com sucesso:', contact);
      return contact;
    } catch (error) {
      console.error('DatabaseStorage: erro ao criar contato:', error);
      throw error;
    }
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));
  }

  async updateContactStatus(id: number, statusData: UpdateContactStatus): Promise<Contact | undefined> {
    try {
      const [updatedContact] = await db
        .update(contacts)
        .set({
          status: statusData.status,
          ...(statusData.isRead !== undefined && { isRead: statusData.isRead })
        })
        .where(eq(contacts.id, id))
        .returning();
      
      return updatedContact;
    } catch (error) {
      console.error('DatabaseStorage: erro ao atualizar status do contato:', error);
      throw error;
    }
  }

  async markContactAsRead(id: number): Promise<Contact | undefined> {
    try {
      const [updatedContact] = await db
        .update(contacts)
        .set({ isRead: true })
        .where(eq(contacts.id, id))
        .returning();
      
      return updatedContact;
    } catch (error) {
      console.error('DatabaseStorage: erro ao marcar contato como lido:', error);
      throw error;
    }
  }

  async getContactsByStatus(status: string): Promise<Contact[]> {
    return await db
      .select()
      .from(contacts)
      .where(eq(contacts.status, status))
      .orderBy(desc(contacts.createdAt));
  }

  // Métodos de usuário
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: RegisterUser): Promise<User> {
    try {
      const [user] = await db.insert(users)
        .values({
          username: userData.username,
          password: userData.password, // Deve ser hash antes de chegar aqui
          name: userData.name,
          isAdmin: true, // Todos os usuários criados são administradores
        })
        .returning();
      
      return user;
    } catch (error) {
      console.error('DatabaseStorage: erro ao criar usuário:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt));
  }
  
  async updateUser(id: number, userData: UpdateUser): Promise<User | undefined> {
    try {
      // Verificar se usuário existe
      const existingUser = await this.getUser(id);
      if (!existingUser) {
        return undefined;
      }
      
      // Preparar os dados para atualização (apenas campos fornecidos)
      const updateData: { name?: string; password?: string } = {};
      if (userData.name) {
        updateData.name = userData.name;
      }
      if (userData.password) {
        updateData.password = userData.password; // Deve ser hash antes de chegar aqui
      }
      
      // Se não tiver dados para atualizar, retornar o usuário existente
      if (Object.keys(updateData).length === 0) {
        return existingUser;
      }
      
      // Atualizar o usuário
      const [updatedUser] = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, id))
        .returning();
      
      return updatedUser;
    } catch (error) {
      console.error('DatabaseStorage: erro ao atualizar usuário:', error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      // Não permitir excluir o usuário admin principal (id = 1)
      if (id === 1) {
        return false;
      }

      // Verificar se o usuário existe
      const user = await this.getUser(id);
      if (!user) {
        return false;
      }

      // Excluir o usuário
      await db.delete(users).where(eq(users.id, id));
      
      // Se não ocorreu erro, consideramos a operação bem-sucedida
      return true;
    } catch (error) {
      console.error('DatabaseStorage: erro ao excluir usuário:', error);
      throw error;
    }
  }
}

// Use o armazenamento em banco de dados
export const storage = new DatabaseStorage();

import type { Contact, InsertContact, UpdateContactStatus } from "@shared/schema";
import { contacts } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface de armazenamento com métodos necessários
export interface IStorage {
  // Métodos para contato
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contactData: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  updateContactStatus(id: number, statusData: UpdateContactStatus): Promise<Contact | undefined>;
  markContactAsRead(id: number): Promise<Contact | undefined>;
  getContactsByStatus(status: string): Promise<Contact[]>;
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
}

// Use o armazenamento em banco de dados
export const storage = new DatabaseStorage();

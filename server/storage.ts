import type { Contact, InsertContact } from "@shared/schema";
import { contacts } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface de armazenamento com métodos necessários
export interface IStorage {
  // Métodos para contato
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contactData: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

// Armazenamento em banco de dados
export class DatabaseStorage implements IStorage {
  // Métodos de contato
  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts)
      .values({
        name: insertContact.name,
        email: insertContact.email,
        phone: insertContact.phone,
        message: insertContact.message
      })
      .returning();
      
    console.log(`Novo contato recebido: ${contact.name} (${contact.email})`);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }
}

// Use o armazenamento em banco de dados
export const storage = new DatabaseStorage();

import type { Contact, InsertContact } from "@shared/schema";

// Interface de armazenamento com métodos necessários
export interface IStorage {
  // Métodos para contato
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contactData: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private contactCurrentId: number;

  constructor() {
    this.contacts = new Map();
    this.contactCurrentId = 1;
  }

  // Métodos de contato
  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const now = new Date();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: now 
    };
    this.contacts.set(id, contact);
    console.log(`Novo contato recebido: ${contact.name} (${contact.email})`);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();

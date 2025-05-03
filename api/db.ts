
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

// Verifica se temos a string de conexão
if (!connectionString) {
  throw new Error('DATABASE_URL não configurada');
}

const client = postgres(connectionString);
export const db = drizzle(client);

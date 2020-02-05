import connect, { sql } from '@databases/pg';

// By default, @database/pg uses process.env.DATABASE_URL
// as the connection string
const db = connect();

async function authenticate() {
  return db.query(sql`SELECT 1+1 AS result`);
}

export type ContactsTable = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  company: string;
  created_at: Date | string;
  updated_at: Date | string;
};

export { db, sql, authenticate };

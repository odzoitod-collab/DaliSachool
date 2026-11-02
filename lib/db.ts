import { Pool } from 'pg';

const globalForDb = globalThis as unknown as { pool?: Pool };
export function getPool() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
  if (!globalForDb.pool) globalForDb.pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return globalForDb.pool;
}

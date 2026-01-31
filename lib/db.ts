import { neon } from "@neondatabase/serverless";

let sql: any;

export function getSql() {
  if (!sql) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL is not set');
    }
    sql = neon(dbUrl);
  }
  return sql;
}

// Export as a callable function that initializes lazily
export { getSql as sql };

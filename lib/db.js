import { createClient } from "@libsql/client";

const globalForDb = globalThis;

export const db =
  globalForDb.db ??
  createClient({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}

import type { Adapter, AdapterAccount, AdapterUser, AdapterSession } from "next-auth/adapters";
import { sql } from "@/lib/db";

export function NeonAdapter(): Adapter {
  return {
    async createUser(user) {
      const result = await sql`
        INSERT INTO "User" (name, email, "emailVerified", image)
        VALUES (${user.name}, ${user.email}, ${user.emailVerified}, ${user.image})
        RETURNING id, name, email, "emailVerified", image
      `;
      return result[0] as AdapterUser;
    },

    async getUser(id) {
      const result = await sql`SELECT * FROM "User" WHERE id = ${id}`;
      return (result[0] as AdapterUser) ?? null;
    },

    async getUserByEmail(email) {
      const result = await sql`SELECT * FROM "User" WHERE email = ${email}`;
      return (result[0] as AdapterUser) ?? null;
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const result = await sql`
        SELECT u.* FROM "User" u
        JOIN "Account" a ON u.id = a."userId"
        WHERE a."providerAccountId" = ${providerAccountId} AND a.provider = ${provider}
      `;
      return (result[0] as AdapterUser) ?? null;
    },

    async updateUser(user) {
      const result = await sql`
        UPDATE "User"
        SET name = ${user.name}, email = ${user.email}, "emailVerified" = ${user.emailVerified}, image = ${user.image}
        WHERE id = ${user.id}
        RETURNING id, name, email, "emailVerified", image
      `;
      return result[0] as AdapterUser;
    },

    async deleteUser(userId) {
      await sql`DELETE FROM "User" WHERE id = ${userId}`;
    },

    async linkAccount(account) {
      await sql`
        INSERT INTO "Account" ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state)
        VALUES (${account.userId}, ${account.type}, ${account.provider}, ${account.providerAccountId}, ${account.refresh_token ?? null}, ${account.access_token ?? null}, ${account.expires_at ?? null}, ${account.token_type ?? null}, ${account.scope ?? null}, ${account.id_token ?? null}, ${account.session_state ?? null})
      `;
      return account as AdapterAccount;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      await sql`DELETE FROM "Account" WHERE "providerAccountId" = ${providerAccountId} AND provider = ${provider}`;
    },

    async createSession(session) {
      const result = await sql`
        INSERT INTO "Session" ("sessionToken", "userId", expires)
        VALUES (${session.sessionToken}, ${session.userId}, ${session.expires})
        RETURNING "sessionToken", "userId", expires
      `;
      return result[0] as AdapterSession;
    },

    async getSessionAndUser(sessionToken) {
      const result = await sql`
        SELECT s.*, u.id as "userId", u.name, u.email, u."emailVerified", u.image
        FROM "Session" s
        JOIN "User" u ON s."userId" = u.id
        WHERE s."sessionToken" = ${sessionToken}
      `;
      
      if (!result[0]) return null;
      
      const row = result[0];
      return {
        session: {
          sessionToken: row.sessionToken,
          userId: row.userId,
          expires: row.expires,
        } as AdapterSession,
        user: {
          id: row.userId,
          name: row.name,
          email: row.email,
          emailVerified: row.emailVerified,
          image: row.image,
        } as AdapterUser,
      };
    },

    async updateSession(session) {
      const result = await sql`
        UPDATE "Session"
        SET expires = ${session.expires}
        WHERE "sessionToken" = ${session.sessionToken}
        RETURNING "sessionToken", "userId", expires
      `;
      return result[0] as AdapterSession;
    },

    async deleteSession(sessionToken) {
      await sql`DELETE FROM "Session" WHERE "sessionToken" = ${sessionToken}`;
    },

    async createVerificationToken(token) {
      const result = await sql`
        INSERT INTO "VerificationToken" (identifier, token, expires)
        VALUES (${token.identifier}, ${token.token}, ${token.expires})
        RETURNING identifier, token, expires
      `;
      return result[0];
    },

    async useVerificationToken({ identifier, token }) {
      const result = await sql`
        DELETE FROM "VerificationToken"
        WHERE identifier = ${identifier} AND token = ${token}
        RETURNING identifier, token, expires
      `;
      return result[0] ?? null;
    },
  };
}

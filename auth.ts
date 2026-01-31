import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getSql } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;
      
      try {
        const sql = getSql();
        // Check if user exists
        const existingUsers = await sql`
          SELECT id FROM "User" WHERE email = ${user.email}
        `;
        
        if (existingUsers.length === 0) {
          // Create new user
          await sql`
            INSERT INTO "User" (id, name, email, image)
            VALUES (${crypto.randomUUID()}, ${user.name}, ${user.email}, ${user.image})
          `;
        }
      } catch (error) {
        console.error("Error in signIn callback:", error);
      }
      
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const sql = getSql();
        const users = await sql`
          SELECT id FROM "User" WHERE email = ${user.email}
        `;
        if (users.length > 0) {
          token.userId = users[0].id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId && session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

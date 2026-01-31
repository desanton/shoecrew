import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NeonAdapter } from "@/lib/neon-adapter";

export const authOptions: NextAuthOptions = {
  adapter: NeonAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "@/libs/db";
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.role) {
        //@ts-ignore
        session.user.role = token.role;
        return session;
      }
      return session;
    },
    async jwt({ token }) {
      const user = await prisma.user.findUnique({
        where: { id: token.sub },
      });
      if (!user) {
        return token;
      }
      token.role = user.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

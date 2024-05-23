import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import credentials from "next-auth/providers/credentials";
import { compareHashedPassword } from "@/utils/encryption";

import prisma from "@/libs/db";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!userFound) return null;
        if (credentials.username !== userFound.name) return null;
        const comparedPassword = await compareHashedPassword(
          // @ts-ignore
          credentials.password,
          userFound.password
        );
        if (!comparedPassword) return null;
        return {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
});

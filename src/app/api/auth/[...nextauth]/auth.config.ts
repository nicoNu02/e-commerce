import credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { compareHashedPassword } from "@/utils/encryption";
import prisma from "@/libs/db";
export default {
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

      //@ts-ignore
      authorize: async (credentials) => {
        const userFound = await prisma.user.findUnique({
          where: {
            //@ts-ignore
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
} satisfies NextAuthConfig;

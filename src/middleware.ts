import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import prisma from "@/libs/db";
import { compareHashedPassword } from "@/utils/encryption";

const auth = NextAuth({
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
        console.log(credentials);
        const userFound = await prisma.user.findUnique({
          where: {
            //@ts-ignore
            email: credentials.email,
          },
        });
        if (!userFound) return null;
        if (credentials.username !== userFound.name) return null;
        const comparedPassword = await compareHashedPassword(
          //@ts-ignore
          credentials.password,
          userFound.password
        );
        if (!comparedPassword) return null;
        console.log(userFound);
        return {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
});

export default auth.auth((req) => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, "/api/auth/signin");
    return Response.redirect(url);
  }
});
console.log("middleware");
export const config = {
  matcher: ["/upload"],
};

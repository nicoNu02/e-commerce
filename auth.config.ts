// import credentials from "next-auth/providers/credentials";
// import type { NextAuthConfig } from "next-auth";
// import prisma from "@/libs/db";
// import { comparePassword } from "@/utils/passwordEncryption";
// // Notice this is only an object, not a full Auth.js instance
// export const configuration = {
//   providers: {
//     {
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "Username" },
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@email.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "*****",
//         },
//       },
//       authorize: async (credentials, req) => {
//         console.log(credentials);
//         const userFound = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });
//         if (!userFound) return null;
//         if (credentials.username !== userFound.name) return null;
//         const comparedPassword = await comparePassword(
//           credentials.password,
//           userFound.password
//         );
//         if (!comparedPassword) return null;
//         console.log(userFound);
//         return {
//           id: userFound.id,
//           name: userFound.name,
//           email: userFound.email,
//         };
//       },
//     },
//   },
// };

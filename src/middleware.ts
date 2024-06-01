import { NextResponse } from "next/server";
import authConfig from "../auth.config";
import NextAuth from "next-auth";

export const { auth } = NextAuth(authConfig);
console.log("middleware");
//@ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const { url } = req;
  console.log(url);
  const contaisRegister = url.endsWith("/api/auth/signin");
  if (!req.auth && !contaisRegister) {
    return Response.redirect(new URL("/api/auth/signin", nextUrl));
  }
  const isCheckout = url.endsWith("/checkout");
  if (isCheckout) {
    return Response.redirect(new URL("/checkout?stage=shipping", nextUrl));
  }
  return null;
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

import { NextResponse } from "next/server";
import authConfig from "../auth.config";
import NextAuth from "next-auth";

export const { auth } = NextAuth(authConfig);
//@ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const { url } = req;
  const contaisUpload = url.endsWith("/upload/product");
  // const containstSearch = url.includes("/?search=");

  // if (containstSearch) {
  //   const endpoint = url.split("?search=")[1];
  //   console.log(endpoint);
  //   return NextResponse.redirect(
  //     new URL(`/products?search=${endpoint}`, nextUrl)
  //   );
  // }
  if (!req.auth && contaisUpload) {
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

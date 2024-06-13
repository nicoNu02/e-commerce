"use client";

//0ka00001dmnwcw4c1nd
import { signIn } from "next-auth/react";
export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hola Miriam!!</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}

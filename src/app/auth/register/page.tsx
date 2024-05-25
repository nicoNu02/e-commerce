"use client";
import { useForm } from "react-hook-form";
export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJSON = await res.json();
  });
  return (
    <div>
      <form className="flex flex-col bg-black p-8" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />
        <input
          type="email"
          placeholder="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
        />
        <input
          type="password"
          placeholder="********"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        <button type="submit" className="text-white">
          submit
        </button>
      </form>
    </div>
  );
}

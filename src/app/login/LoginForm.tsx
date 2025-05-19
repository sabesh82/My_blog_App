"use client";
import React, { useState } from "react";
import { UserLoginInput } from "../api/user/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginSchema } from "../api/user/user.schema";
import { useRouter } from "next/navigation";
import { useApi } from "@/providers/apiProvider";
import Cookie from "js-cookie";
import { cookieKeys } from "@/config/cookies.config";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UserLoginInput>({
    mode: "onChange",
    resolver: zodResolver(UserLoginSchema),
    shouldFocusError: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { apiClient } = useApi();
  return (
    <form
      onChange={handleSubmit(async (userData) => {
        try {
          setIsLoading(true);

          const { data: user } = await apiClient.post("login", userData);

          const token = user.token;

          Cookie.set(cookieKeys.USER_TOKEN, token);
          console.log({ user });
          reset();

          router.push("/");
        } catch (error) {
          console.log({ error });
        } finally {
          setIsLoading(false);
        }
      })}
      className="space-y-6 w-full max-w-xl mx-auto"
    >
      <div className="flex flex-col gap-5 bg-white p-8 rounded-3xl shadow-xl w-full ">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-black/95  text-transparent bg-clip-text mb-2">
          Login
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className={`mb-1 text-sm font-medium ${
              errors.email ? "text-red-600" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="you@example.com"
            className={`p-3 rounded-xl border outline-none transition duration-300 ${
              errors.email
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className={`mb-1 text-sm font-medium ${
              errors.password ? "text-red-600" : "text-gray-700"
            }`}
          >
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="••••••••"
            className={`p-3 rounded-xl border outline-none transition duration-300 ${
              errors.password
                ? "border-red-500 focus:ring-1 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-purple-500"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg py-3 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

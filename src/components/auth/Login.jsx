"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/queries/useAuthQuery";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { mutate, isLoading, error } = useLogin();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: (response) => {
        const data = response?.data || response;

        if (data?.success) {
          let redirectPath = "/customer/dashboard";
          if (data.user?.role === 1) redirectPath = "/shop/dashboard";
          if (data.user?.role === 2) redirectPath = "/admin/dashboard";

          router.push(redirectPath);
        }
      },
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* LEFT BRAND SECTION */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Welcome back</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Sign in to manage your store, track orders, and grow your business
            with our modern commerce platform.
          </p>

          <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-gray-400">
            Secure · Fast · Reliable
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
            <p className="text-gray-500 mb-8">
              Enter your credentials to continue
            </p>

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/" className="font-medium text-black hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

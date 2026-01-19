"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/queries/useAuthQuery"; 
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { mutate, isLoading, error } = useLogin();
  const [form, setForm] = useState({ email: "", password: "" });

  // Update form state on input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle login form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: (response) => {
        // If using Axios, sometimes response is wrapped: response.data
        const data = response?.data || response;

        if (data?.success) {

          // Determine redirect path based on role
          let redirectPath = "/customer/dashboard"; // default for role 0
          if (data.user?.role === 1) redirectPath = "/shop/dashboard";
          if (data.user?.role === 2) redirectPath = "/admin/dashboard";

          // Redirect user
          router.push(redirectPath);
        } else {
          alert(data?.message || "Login failed");
        }
      },
      onError: (err) => {
        console.error("Login error:", err);
        alert(err?.message || "Something went wrong");
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Hero Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 justify-center items-center">
        <div className="text-white text-center px-10">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg">
            Access your dashboard and manage your ecommerce store efficiently.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex flex-1 justify-center items-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-center">{error.message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-gray-600 font-medium">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600 font-medium">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

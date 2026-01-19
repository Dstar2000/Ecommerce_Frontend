"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/queries/useAuthQuery";
import Link from "next/link";

export default function ShopRegisterForm() {
  const router = useRouter();
  const { mutate, isLoading, error } = useRegister();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    shopName: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      { ...form, role: 1 },
      {
        onSuccess: () => router.push("/auth/login"),
        onError: (err) =>
          alert(err.response?.data?.message || "Registration failed"),
      },
    );
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* LEFT BRAND SECTION */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-900 to-black text-white">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Start selling online</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Register your shop, manage products, track orders, and grow your
            business with our powerful commerce platform.
          </p>

          <div className="mt-12 border-t border-indigo-700 pt-6 text-sm text-gray-400">
            Seller Dashboard · Orders · Analytics
          </div>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Shop owner registration
            </h2>
            <p className="text-gray-500 mb-8">Create your shop owner account</p>

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error.response?.data?.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="name"
                placeholder="Owner name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />

              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />

              <input
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />

              <input
                name="address"
                placeholder="Business address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />

              <input
                name="shopName"
                placeholder="Shop name"
                value={form.shopName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Create shop account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-black hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

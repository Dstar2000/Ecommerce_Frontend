"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Buy Everything You Need
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mb-8">
          The most modern ecommerce platform built with Next.js, Tailwind CSS,
          TanStack Query, and secure authentication.
        </p>

        {/* Registration & Login Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* Customer Register */}
          <Link href="/auth/register/customer">
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
              Register as Customer
            </button>
          </Link>

          {/* Shop Owner Register */}
          <Link href="/auth/register/shop">
            <button className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition">
              Register as Shop Owner
            </button>
          </Link>

          {/* Admin Register */}
          <Link href="/auth/register/admin">
            <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
              Register as Admin
            </button>
          </Link>

          {/* Login */}
          <Link href="auth/login">
            <button className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
              Login
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

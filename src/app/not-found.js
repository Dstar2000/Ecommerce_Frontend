"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-9xl font-extrabold text-blue-600 mb-6">404</h1>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist. It might have been moved or deleted.
      </p>

      <div className="flex gap-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          Go Back
        </button>

        {/* Home Button */}
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

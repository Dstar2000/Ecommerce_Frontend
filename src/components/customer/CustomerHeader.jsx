"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { withClientOnly } from "@/utils/withClientOnly";

const CustomerHeaderProfile = withClientOnly(
  () => import("./CustomerHeaderProfile"),
  <span className="text-sm text-gray-400">Loading...</span>,
);

function CustomerHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/auth/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
          C
        </div>
        <h1 className="text-lg font-semibold text-gray-800">
          Customer Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <CustomerHeaderProfile />

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:scale-95 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default CustomerHeader;

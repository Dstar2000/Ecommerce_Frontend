"use client";

import React from "react";
import { useRouter } from "next/navigation";

function ShopHeader() {
  const router = useRouter();

  const handleLogout = () => {
    // 1️⃣ Clear auth/session data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 2️⃣ Redirect to login
    router.replace("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold">
          S
        </div>
        <h1 className="text-lg font-semibold text-gray-800">Shop Dashboard</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Shop Owner</span>

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

export default ShopHeader;

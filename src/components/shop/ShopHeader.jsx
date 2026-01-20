"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/queries/useUser";

function ShopHeader() {
  const router = useRouter();

  // 🔹 CALL PROFILE API
  const { data, isLoading } = useUserProfile();

  const user = data?.data?.user;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center font-bold">
          {user?.name?.charAt(0)?.toUpperCase() || "S"}
        </div>
        <h1 className="text-lg font-semibold text-gray-800">Shop Dashboard</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {isLoading ? (
          <span className="text-sm text-gray-400">Loading...</span>
        ) : (
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">
              {user?.role === 1 ? "Shop Owner" : "User"}
            </p>
          </div>
        )}

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

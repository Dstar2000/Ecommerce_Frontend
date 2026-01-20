"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/queries/useUser";

function AdminHeader() {
  const router = useRouter();

  // 🔥 Call profile API
  const { data, isLoading, isError } = useUserProfile();

  console.log("data", data);

  const user = data?.data?.user;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/auth/login");
  };

  return (
    <header className="h-16 bg-gray-900 text-white flex items-center justify-between px-6 border-b border-gray-800">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-blue-600 flex items-center justify-center font-bold text-white">
          A
        </div>
        <h1 className="text-lg font-semibold tracking-wide">Admin Dashboard</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {isLoading && <span className="text-sm text-gray-500">Loading...</span>}

        {isError && (
          <span className="text-sm text-red-400">Failed to load profile</span>
        )}

        {user && (
          <span className="text-sm text-gray-400">
            Welcome, <strong>{user.name}</strong>
          </span>
        )}

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-md bg-red-500 text-sm font-medium hover:bg-red-600 active:scale-95 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;

"use client";
import React from "react";

function AdminHeader() {
  return (
    <header className="h-16 bg-gray-900 text-white flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-blue-600 flex items-center justify-center font-bold">
          A
        </div>
        <h1 className="text-lg font-semibold tracking-wide">Admin Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">Super Admin</span>
        <button className="px-4 py-1.5 rounded-md bg-red-500 text-sm hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;

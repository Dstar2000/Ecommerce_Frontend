"use client";
import React from "react";

function CustomerHeader() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
          C
        </div>
        <h1 className="text-lg font-semibold text-gray-800">
          Customer Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Welcome Customer</span>
        <button className="px-4 py-1.5 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
}

export default CustomerHeader;

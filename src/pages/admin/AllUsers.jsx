"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { withClientOnly } from "@/utils/withClientOnly";

const AllUsersContent = withClientOnly(
  () => import("@/components/admin/AllUsersContent"),
  <p className="text-gray-500">Loading users...</p>,
);

export default function AllUsers() {
  const router = useRouter();

  // Auth & Role Check
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.replace("/auth/login");

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 2) router.replace("/auth/login"); // 2 = admin
    } catch (err) {
      console.error("Invalid token", err);
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        <AllUsersContent />
      </main>
    </div>
  );
}

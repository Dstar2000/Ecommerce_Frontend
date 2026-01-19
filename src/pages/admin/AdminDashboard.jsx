"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // role: 2 = admin
      if (decoded.role !== 2) {
        router.replace("/auth/login");
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600">
        Welcome Admin! You have full system access.
      </p>
    </div>
  );
}

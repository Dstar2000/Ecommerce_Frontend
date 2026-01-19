"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function CustomerDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // role: 0 = customer
      if (decoded.role !== 0) {
        router.replace("/login");
        return;
      }

      setLoading(false);
    } catch (error) {
      console.error("Invalid token", error);
      router.replace("/login");
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
      <p className="text-gray-700">
        Welcome Customer! Here you can view your profile, orders, and shop
        items.
      </p>

      {/* Example cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-2">Profile</h2>
          <p>View and edit your profile information</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-2">Orders</h2>
          <p>Check your order history and status</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-2">Shop Items</h2>
          <p>Browse available products in the store</p>
        </div>
      </div>
    </div>
  );
}

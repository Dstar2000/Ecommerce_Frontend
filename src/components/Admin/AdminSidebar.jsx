"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Shops", path: "/admin/shops" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Reports", path: "/admin/reports" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6">
        Admin Panel
      </h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded-md text-sm transition
              ${
                pathname === item.path
                  ? "bg-blue-600"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;

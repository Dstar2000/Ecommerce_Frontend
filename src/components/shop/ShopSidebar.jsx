"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ShopSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/shop/dashboard" },
    { name: "Products", path: "/shop/products" },
    { name: "Orders", path: "/shop/orders" },
    { name: "Customers", path: "/shop/customers" },
    { name: "Settings", path: "/shop/settings" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-200 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Shop Panel</h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded-md text-sm transition
              ${
                pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default ShopSidebar;

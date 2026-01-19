"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CustomerSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/customer/dashboard" },
    { name: "My Orders", path: "/customer/orders" },
    { name: "Wishlist", path: "/customer/wishlist" },
    { name: "Profile", path: "/customer/profile" },
    { name: "Settings", path: "/customer/settings" },
  ];

  return (
    <aside className="w-60 bg-gray-100 border-r min-h-screen p-4">
      <h2 className="text-lg font-semibold mb-6 text-gray-700">
        Customer Panel
      </h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded-md text-sm transition
              ${
                pathname === item.path
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default CustomerSidebar;

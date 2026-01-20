"use client";

import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import "../globals.css";


export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}

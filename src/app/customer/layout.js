"use client";

import CustomerHeader from "@/components/customer/CustomerHeader";
import CustomerSidebar from "@/components/customer/CustomerSidebar";
import "../globals.css";


export default function CustomerLayout({ children }) {
  return (
    <>
      <CustomerHeader />
      <div className="flex min-h-screen">
        <CustomerSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}

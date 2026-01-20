"use client";

import React from "react";
import { withClientOnly } from "@/utils/withClientOnly";

const ShopProductsContent = withClientOnly(
  () => import("@/components/shop/ShopProductsContent"),
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
  </div>
);

export default function ShopProducts() {
  return <ShopProductsContent />;
}

"use client";

import React from "react";
import { useUserProfile } from "@/queries/useUser";

function ShopHeaderProfile() {
  const { data, isLoading } = useUserProfile();

  const user = data?.data?.user;

  return (
    <>
      {isLoading ? (
        <span className="text-sm text-gray-400">Loading...</span>
      ) : (
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">{user?.name}</p>
          <p className="text-xs text-gray-500">
            {user?.role === 1 ? "Shop Owner" : "User"}
          </p>
        </div>
      )}
    </>
  );
}

export default ShopHeaderProfile;

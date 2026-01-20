"use client";

import React from "react";
import { useUserProfile } from "@/queries/useUser";

function AdminHeaderProfile() {
  const { data, isLoading, isError } = useUserProfile();

  const user = data?.data?.user;

  return (
    <>
      {isLoading && <span className="text-sm text-gray-500">Loading...</span>}

      {isError && (
        <span className="text-sm text-red-400">Failed to load profile</span>
      )}

      {user && (
        <span className="text-sm text-gray-400">
          Welcome, <strong>{user.name}</strong>
        </span>
      )}
    </>
  );
}

export default AdminHeaderProfile;

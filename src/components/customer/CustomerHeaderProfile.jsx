"use client";

import React from "react";
import { useUserProfile } from "@/queries/useUser";

function CustomerHeaderProfile() {
  const { data, isLoading, isError } = useUserProfile();

  const user = data?.data?.user;

  return (
    <>
      {isLoading && <span className="text-sm text-gray-400">Loading...</span>}

      {isError && (
        <span className="text-sm text-red-500">Failed to load profile</span>
      )}

      {user && (
        <span className="text-sm text-gray-600">
          Welcome, <strong>{user.name}</strong>
        </span>
      )}
    </>
  );
}

export default CustomerHeaderProfile;

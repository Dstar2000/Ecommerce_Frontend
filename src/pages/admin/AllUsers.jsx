"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import {
  useAllUsers,
  useDeleteUser,
  useUpdateUserStatus,
} from "@/queries/useAdmin";

export default function AllUsers() {
  const router = useRouter();

  // Auth & Role Check
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.replace("/auth/login");

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 2) router.replace("/auth/login"); // 2 = admin
    } catch (err) {
      console.error("Invalid token", err);
      router.replace("/auth/login");
    }
  }, [router]);

  // Fetch all users
  const { data, isLoading, isError, refetch } = useAllUsers();
  const deleteUserMutation = useDeleteUser();
  const updateStatusMutation = useUpdateUserStatus();

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUserMutation.mutateAsync(id);
      alert("User deleted successfully!");
      refetch();
    } catch (err) {
      alert("Failed to delete user");
      console.error(err);
    }
  };

  const toggleStatus = async (user) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    try {
      await updateStatusMutation.mutateAsync({
        id: user._id,
        status: newStatus,
      });
      refetch();
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  const users = data?.data?.users || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>

        {isLoading && <p className="text-gray-500">Loading users...</p>}
        {isError && <p className="text-red-500">Failed to fetch users.</p>}

        {!isLoading && !isError && users.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}

        {!isLoading && !isError && users.length > 0 && (
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === 0
                        ? "Customer"
                        : user.role === 1
                          ? "Shop Owner"
                          : "Admin"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <button
                        onClick={() => toggleStatus(user)}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

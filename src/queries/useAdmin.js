import {
  deleteUserApi,
  getAllUsersApi,
  getSingleUserApi,
  updateUserStatusApi,
} from "@/api/admin.api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsersApi,
  })
}

export const useSingleUser = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getSingleUserApi(id),
    enabled: !!id,
  })
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUserApi,
  })
}

export const useUpdateUserStatus = () => {
  return useMutation({
    mutationFn: updateUserStatusApi,
  });
};


import { getProfileApi, updateProfileApi } from "@/api/user.api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfileApi,
  })
}

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfileApi,
  })
}

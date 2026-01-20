import ApiClient from "@/utils/apiClient"
import { ENDPOINTS } from "@/endpoints"

export const getProfileApi = () => {
  return ApiClient.get(ENDPOINTS.GET_PROFILE)
}

export const updateProfileApi = (payload) => {
  return ApiClient.put(ENDPOINTS.UPDATE_PROFILE, payload)
}

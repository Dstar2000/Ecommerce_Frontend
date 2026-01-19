import { ENDPOINTS } from "@/endpoints"
import ApiClient from "@/utils/apiClient"

export const loginApi = (payload) => {
  return ApiClient.post(ENDPOINTS.LOGIN, payload)
}

export const registerApi = (payload) => {
  return ApiClient.post(ENDPOINTS.REGISTER, payload)
}

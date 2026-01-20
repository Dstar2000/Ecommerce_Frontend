import ApiClient from "@/utils/apiClient"
import { ENDPOINTS } from "@/endpoints"

export const loginApi = (payload) => {
  return ApiClient.post(ENDPOINTS.LOGIN, payload)
}

export const registerApi = (payload) => {
  return ApiClient.post(ENDPOINTS.REGISTER, payload)
}

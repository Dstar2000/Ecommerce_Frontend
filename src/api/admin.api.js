import ApiClient from "@/utils/apiClient"
import { ENDPOINTS } from "@/endpoints"

export const getAllUsersApi = () => {
  return ApiClient.get(ENDPOINTS.GET_ALL_USERS)
}

export const getSingleUserApi = (id) => {
  return ApiClient.get(ENDPOINTS.GET_SINGLE_USER(id))
}

export const deleteUserApi = (id) => {
  return ApiClient.delete(ENDPOINTS.DELETE_USER(id))
}

export const updateUserStatusApi = ({ id, status }) => {
  return ApiClient.put(ENDPOINTS.UPDATE_USER_STATUS(id), { status });
};



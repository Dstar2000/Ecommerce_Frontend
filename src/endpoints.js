export const ENDPOINTS = {
  // AUTH
  REGISTER: "/api/v1/auth/register",
  LOGIN: "/api/v1/auth/login",

  // USER
  GET_PROFILE: "/api/v1/user/profile",
  UPDATE_PROFILE: "/api/v1/user/profile",

  // ADMIN USER MANAGEMENT
  GET_ALL_USERS: "/api/v1/user/all-users",
  GET_SINGLE_USER: (id) => `/api/v1/user/${id}`,
  DELETE_USER: (id) => `/api/v1/user/${id}`,
  UPDATE_USER_STATUS: (id) => `/api/v1/user/${id}`,

  // PRODUCTS
  GET_ALL_PRODUCTS: "/api/v1/product",
  GET_PRODUCT: (id) => `/api/v1/product/${id}`,
  CREATE_PRODUCT: "/api/v1/product",
  UPDATE_PRODUCT: (id) => `/api/v1/product/${id}`,
  DELETE_PRODUCT: (id) => `/api/v1/product/${id}`,
};

import axios from "axios"

const ApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Uses environment variable
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

/* REQUEST INTERCEPTOR */
ApiClient.interceptors.request.use(
  (config) => {
    // Only run in browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}` // Add Bearer
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

/* RESPONSE INTERCEPTOR */
ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong"
    return Promise.reject(message)
  }
)

export default ApiClient

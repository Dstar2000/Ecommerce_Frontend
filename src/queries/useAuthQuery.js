import { loginApi, registerApi } from "@/api/auth.api"
import { useMutation } from "@tanstack/react-query"

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token)
    },
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token)
    },
  })
}

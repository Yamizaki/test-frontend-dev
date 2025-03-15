import { LoginType } from '@/adapters/authAdapter'
import { AuthService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'

const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ username, password }: LoginType) => {
      return await AuthService.login({ username, password })
    }
  })
}

export { useLogin }

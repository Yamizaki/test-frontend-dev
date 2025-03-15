import { AuthAdapter, LoginType } from '@/adapters/authAdapter'

export const AuthService = {
  login: async ({ username, password }: LoginType) => {
    return await AuthAdapter.login({ username, password })
  }
}

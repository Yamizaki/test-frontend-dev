import testApi from '@/lib/axios/client'
import { formLoginSchema } from '@/lib/zod/login'
import { AxiosError, AxiosResponse } from 'axios'
import { z } from 'zod'

export type LoginType = z.infer<typeof formLoginSchema>
export type LoginResponse = {
  access_token: string
}

export type LoginError = {
  msg: string
}

export const AuthAdapter = {
  login: async ({ username, password }: LoginType) => {
    try {
      const client = testApi()
      const res: AxiosResponse<LoginResponse | LoginError> = await client.post<
        LoginResponse | LoginError
      >('/login', { username, password })
      return res.data as LoginResponse
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error.response?.data as LoginError

        throw new Error(errorResponse.msg ?? 'UNKNOWN_ERROR')
      }
      throw new Error('UNKNOWN_ERROR')
    }
  }
}

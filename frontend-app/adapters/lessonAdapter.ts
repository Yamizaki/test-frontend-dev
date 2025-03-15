import testApi from '@/lib/axios/client'
import { AxiosError, AxiosResponse } from 'axios'

export const LessonAdapter = {
  getLessons: async () => {
    try {
      const client = testApi()
      const res: AxiosResponse<ModuleClass[] | LoginError> = await client.get<
        ModuleClass[] | LoginError
      >('/api/modulos')
      return res.data as ModuleClass[]
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error.response?.data as LoginError

        throw new Error(errorResponse.msg ?? 'UNKNOWN_ERROR')
      }
      throw new Error('UNKNOWN_ERROR')
    }
  }
}

export type ModuleClass = {
  clases: Lesson[]
  descripcion: string
  titulo: string
}

export type Lesson = {
  completado: boolean
  descripcion: string
  duracion: string
  titulo: string
  video: string
}

export type LoginError = {
  msg: string
}

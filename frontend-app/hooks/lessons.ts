import { LessonService } from '@/services/lesson-service'
import { useQuery } from '@tanstack/react-query'

const useGetLessons = () => {
  return useQuery({
    queryKey: ['lessons-list'],
    queryFn: async () => await LessonService.getLessons()
  })
}

export { useGetLessons }

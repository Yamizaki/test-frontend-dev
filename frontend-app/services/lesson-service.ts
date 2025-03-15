import { LessonAdapter } from "@/adapters/lessonAdapter"

export const LessonService = {
    getLessons: async () => {
        return await LessonAdapter.getLessons()
    }
}
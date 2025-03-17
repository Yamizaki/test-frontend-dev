import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Class } from '@/interfaces'

interface GlobalStore {
  courseInfo: Class
  setCourseInfo: (courseInfo: Class) => void
}

export const useStore = create<GlobalStore>()(
  persist(
    (set) => ({
      courseInfo: {} as Class,
      setCourseInfo: (courseInfo) => set({ courseInfo }),
    }),
    {
      name: 'current-module',
    }
  )
)
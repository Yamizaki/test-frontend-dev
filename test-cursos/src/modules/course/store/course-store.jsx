import { create } from "zustand";


export const courseStore = create((set) => ({
  course: [],
  setCourse: (course) => set({ course }),
})
);

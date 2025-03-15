import { create } from "zustand";
import { persist } from "zustand/middleware";

export const authStore = create(
  persist((set) => ({
    userToken: null,
    setUserToken: (userToken) => set({ userToken }),
  }),{
      name: "auth-test",
    })
);

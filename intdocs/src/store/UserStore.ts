import { defineStore } from "pinia";
import { loadUser } from "../services/frappeapi"
import type { User } from "../types/User"

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {} as User

    }
  },
  actions: {
    async fetchUser() {
      const data = await loadUser();
      this.user = data;
    }
  }
})

// Utilities
import { defineStore } from 'pinia'

export const useUserStore = defineStore('app', {
  state: () => ({
    userInfo: null,
    isLoggedIn: false,
  }),
  
  actions: {
    login(userData) {
      this.userInfo = userData;
      this.isLoggedIn = true;
    },

    logout() {
      this.userInfo = null;
      this.isLoggedIn = false;
    },
  },
})

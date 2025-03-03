// Utilities
import { defineStore } from 'pinia'

export const useUserStore = defineStore('app', {
  state: () => ({
    userInfo: null,
    loggedIn: false,
  }),

  actions: {
    login(userData) {
      this.userInfo = userData;
      this.loggedIn = true;
    },

    logout() {
      this.userInfo = null;
      this.loggedIn = false;
    },
  },

  getters: {
    isAuthenticated: (state) => {
      return state.loggedIn;
    }
  }
})

import axios from "axios"
import store from ".."


export default {
  namespaced: true,
  state() {
  },
  mutations: {
  },
  actions: {
    async changeUser({commit}, payload) {
      const token = store.getters['auth/token']
      const userId = store.getters['auth/userId']
      const url = `${process.env.VUE_APP_BASE_URL}/postli/users/${userId}.json?auth=${token}`
      console.log(url)
      const response = axios.patch(url, payload)
      console.log(response)
    }
  },
  getters: {
  }
}
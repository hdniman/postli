import axios from "axios"
import store from ".."


export default {
  namespaced: true,
  state() {

  },
  mutations: {

  },
  actions: {
    async createPost({commit}, payload) {
      const token = store.getters['auth/token']
      const url = `${process.env.VUE_APP_BASE_URL}/postli/posts.json?auth=${token}`
      const response = await axios.post(url, {...payload})
      console.log('posted',response)
    }

  },
  getters: {

  }
}
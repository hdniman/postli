import axios from "axios"
import store from ".."


export default {
  namespaced: true,
  state() {
  },
  mutations: {
  },
  actions: {
    async signUp({commit, dispatch}, payload) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
      const response = await axios.post(url, {...payload, returnSecureToken: true}) //create user in fb auth
      store.commit('auth/login',response.data.idToken)  // commit token got from fb auth
      dispatch('createUser', { //create fb database info
        email: response.data.email,
        localId: response.data.localId,
        name: `user-${Math.round(100000*Math.random())}`,
        about: '',
        photo: ''
      })
    },
    async createUser({commit},payload) {
      const token = store.getters['auth/token']
      const url = `${process.env.VUE_APP_BASE_URL}/postli/users.json?auth=${token}`
      const response = await axios.post(url, payload)
      
    }
  },
  getters: {
  }
}
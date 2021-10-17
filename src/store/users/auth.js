import axios from "axios"
import store from ".."


export default {
  namespaced: true,
  state() {
    return {
      jwtToken: localStorage.getItem('jwtToken'),
      localId: localStorage.getItem('localId'),
      userInfo: {}
    }
  },
  mutations: {
    login(state, payload) {
      state.jwtToken = payload.idToken
      localStorage.setItem('jwtToken', payload.idToken)
      state.localId = payload.localId
      localStorage.setItem('localId', payload.localId)
    },
    logout(state) {
      state.jwtToken = ''
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('localId')
    },
    getUserInfo(state) {
      const users = store.getters['loadUsers/users']
      state.userInfo = users.find(el => el.localId == state.localId)
    }
  },
  actions: {
    async login({commit}, payload) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
      const response = await axios.post(url, {...payload, returnSecureToken: true})
      commit('login', response.data)
      console.log(response)
      commit('getUserInfo')
    }
  },
  getters: {
    token(state) {
      return state.jwtToken
    },
    isAuthenticated(state) {
      return !!state.jwtToken
    }
  }
}
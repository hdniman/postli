import axios from "axios"
import store from ".."

export default {
  namespaced: true,
  state() {
    return {
      users: []
    }
  },
  mutations:{
    loadUsers(state, payload) {
      state.users = payload
      console.log('users loaded')
    },
    addUser(state, payload) {
      state.users.push(payload)
    },
    changeUser(state, payload) {
      const idx = state.users.findIndex(el => el.userId == payload.userId)
      state.users[idx].nickname = payload.nickname
      state.users[idx].about = payload.about
      state.users[idx].photo = payload.photo
      
    }
  },
  actions: {
    async loadUsers({commit}) {
      const url = `${process.env.VUE_APP_BASE_URL}/postli/users.json`
      const response = await axios.get(url)
      const usersData = response.data
      const request = Object.keys(usersData).map(key => {
        return {
          userId: key,
          localId: usersData[key].localId,
          email: usersData[key].email,
          nickname: usersData[key].nickname,
          photo: usersData[key].photo,
          about: usersData[key].about,
          postsId: usersData[key].postsId,
        }
      })
      await commit('loadUsers', request)
    },
    
    async signUp({commit, dispatch, getters}, payload) {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
      const response = await axios.post(url, {...payload, returnSecureToken: true})//create user in fb auth
      await store.commit('auth/login',response.data)  // commit token got from fb auth
      await dispatch('createUser', { //create fb database info
        email: response.data.email,
        localId: response.data.localId,
        nickname: `user-${Math.round(100000*Math.random())}`,
        about: '',
        photo: '',
        postsId: []
      })
    },

    async createUser({commit},payload) {
      const token = store.getters['auth/token']
      const url = `${process.env.VUE_APP_BASE_URL}/postli/users.json?auth=${token}`
      const response = await axios.post(url, payload)
      store.commit('users/addUser', {...payload, userId : response.data.name})
      store.commit('auth/getUserData')
    },
    
    async changeUser({commit}, payload) {
      const token = store.getters['auth/token']
      const userId = store.getters['auth/userId']
      const url = `${process.env.VUE_APP_BASE_URL}/postli/users/${userId}.json?auth=${token}`
      const response = await axios.patch(url, payload)
      payload.userId = userId

      commit('changeUser', payload)
    }
  },
  getters: {
    users(state) {
      return state.users
    }
  }
}

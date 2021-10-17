import axios from "axios"
import store from ".."

export default {
  namespaced: true,
  state() {
    return {
      users: {}
    }
  },
  mutations:{
    loadUsers(state, payload) {
      state.users = payload
      console.log(state.users)
    },
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
          name: usersData[key].name,
          photo: usersData[key].photo,
          about: usersData[key].about,
        }
      })
      console.log('users request', request)
      commit('loadUsers', request)
    }
  },
  getters: {
    users(state) {
      return state.users
    }
  }
}

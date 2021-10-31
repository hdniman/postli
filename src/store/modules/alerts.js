export default {
  namespaced: true,
  state() {
    return {
      messages: []
    }
  },
  mutations: {
    addMessage(state, payload) {
      state.messages.push( payload )
    },
    deleteMessage(state, payload) {
      const index = state.messages.findIndex(elem => elem.key == payload)
      if (index !== -1) {
        state.messages.splice(index, 1)
      }
    }
  },
  actions: {
    newMessage({commit}, payload) {
      payload.key = Math.round(100000*Math.random())
      console.log(payload)
      commit('addMessage', payload)
      setTimeout(() => {commit('deleteMessage', payload.key)}, 15000)
    }
  },
  getters: {
    messages(state) {
      return state.messages
    }
  }
}
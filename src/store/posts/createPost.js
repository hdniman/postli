import axios from "axios"
import store from ".."


export default {
  namespaced: true,
  state() {

  },
  mutations: {

  },
  actions: {
    async createPost({commit, dispatch}, payload) {
      const token = store.getters['auth/token']
      const user = store.getters['auth/userData'].userId
      const url = `${process.env.VUE_APP_BASE_URL}/postli/posts.json?auth=${token}`
      console.log('test',payload.articleBody)
      const response = await axios.post(url, {
        authorId: user,
        title: payload.title,
        description: payload.description,
        articleBody: payload.articleBody,
        time: Date.now(),
        likes: [],
        dislikes: []
      })
      dispatch('addToAuthor', {postsId: response.data.name, user, token})
    },
    async addToAuthor(_,payload) {
      console.log('payload', payload)
      const url = `${process.env.VUE_APP_BASE_URL}/postli/users/${payload.user}/postsId.json?auth=${payload.token}`
      const response = await axios.patch(url, {[payload.postsId]: ''})
    }
  },
  getters: {

  }
}
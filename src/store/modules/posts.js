import axios from "axios"
import store from ".."

export default {
  namespaced: true,
  state() {
    return {
      postsData: {}
    }
  },
  mutations:{
    loadPosts(state, payload) {
      state.posts = payload
      console.log('posts loaded')
    }
  },
  actions: {
    async loadPosts({commit}) {
      const url = `${process.env.VUE_APP_BASE_URL}/postli/posts.json`
      const response = await axios.get(url)
      const postsData = response.data
      const request = Object.keys(postsData).map(key => {
        return {
          postId: key,
          authorId: postsData[key].authorId,
          title: postsData[key].title,
          description: postsData[key].description,
          articleBody: postsData[key].articleBody,
          time: postsData[key].time,
          likes: postsData[key].likes,
          dislikes: postsData[key].dislikes
        }
      })
      commit('loadPosts', request)
    },
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
    posts(state) {
      return state.posts
    }
  }
}

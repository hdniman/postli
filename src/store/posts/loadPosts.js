import axios from "axios"
import store from ".."

export default {
  namespaced: true,
  state() {
    return {
      posts: {}
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
    }
  },
  getters: {
    posts(state) {
      return state.posts
    }
  }
}

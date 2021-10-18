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
          author: postsData[key].author,
          title: postsData[key].title,
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
  }
}

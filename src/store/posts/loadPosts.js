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
  },
  actions: {
    async loadPosts() {
      const url = `${process.env.VUE_APP_BASE_URL}/postli/posts.json`
      const response = await axios.get(url)
      const postsData = response.data
      const request = Object.keys(postsData).map(key => {
        return {
          postId: key,
          name: postsData[key].name
        }
      })
    }
  },
  getters: {
  }
}

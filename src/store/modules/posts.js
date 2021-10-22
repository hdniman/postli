import axios from "axios"
import store from ".."

export default {
  namespaced: true,
  state() {
    return {
      posts: []
    }
  },
  mutations:{
    loadPosts(state, payload) {
      state.posts = payload
      console.log('posts loaded')
    },
    addPost(state, payload) {
      console.log(payload)
      state.posts.push(payload)
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
          rating: postsData[key].rating
        }
      })
      commit('loadPosts', request)
    },
    async createPost({commit, dispatch}, payload) {
      const token = store.getters['auth/token']
      const url = `${process.env.VUE_APP_BASE_URL}/postli/posts.json?auth=${token}`
      console.log('test',payload.articleBody)
      const response = await axios.post(url, {
        authorId: payload.authorId,
        title: payload.title,
        description: payload.description,
        articleBody: payload.articleBody,
        time: payload.time
      })
      payload.postId = response.data.name
      dispatch('addToAuthor', {...payload, token})

      commit('addPost', payload)


    },
    async addToAuthor(_,payload) {
      const url = `${process.env.VUE_APP_BASE_URL}/postli/users/${payload.authorId}/postsId.json?auth=${payload.token}`
      const response = await axios.patch(url, {[payload.postId] : ''})
    },

    async ratePost(commit, payload) {
      const token = store.getters['auth/token']
      const setRating = [{
        ratingHolder: `users/${store.getters['auth/userId']}/rating/${payload.rating}`,
        source: payload.postId
      },
      {
        ratingHolder: `posts/${payload.postId}/rating/${payload.rating}`,
        source: payload.userId
      }]
      
      console.log('bigData', setRating)
      for(const el of setRating) {
        const url = `${process.env.VUE_APP_BASE_URL}/postli/${el.ratingHolder}.json?auth=${token}`
        const response = await axios.patch(url, {[el.source]: ''})
      }
    }
  },
  getters: {
    posts(state) {
      return state.posts
    }
  }
}

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
    },
    setRating(state, payload) {
      const idx = state.posts.findIndex(el => el.postId == payload.postId)
      console.log(idx)
      if (state.posts[idx].rating == undefined) {
        state.posts[idx].rating = {}
      }
      if (state.posts[idx].rating[payload.rating] == undefined) {
        state.posts[idx].rating[payload.rating] = {}
      }
      state.posts[idx].rating[payload.rating][payload.userId] = ""
    },
    removeRating(state, payload) {
      const idx = state.posts.findIndex(el => el.postId == payload.postId)
      console.log(idx)
      if (state.posts[idx].rating == undefined) {
        state.posts[idx].rating = {}
      }
      if (state.posts[idx].rating[payload.rating] == undefined) {
        state.posts[idx].rating[payload.rating] = {}
      }
      delete state.posts[idx].rating[payload.rating][payload.userId]
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

    async setRating({commit}, payload) {
      console.log('start rating', payload)
      const token = store.getters['auth/token']
      const setRating = [{
        ratingHolder: `users/${store.getters['auth/userId']}/rating/${payload.rating}`,
        source: payload.postId
      },
      {
        ratingHolder: `posts/${payload.postId}/rating/${payload.rating}`,
        source: payload.userId
      }]
      for(const el of setRating) {
        const url = `${process.env.VUE_APP_BASE_URL}/postli/${el.ratingHolder}.json?auth=${token}`
        const response = await axios.patch(url, {[el.source]: ''})
      }
      commit('setRating', payload)
      store.commit('users/setRating', payload)
    },

    async deleteRating({commit}, payload) {
      console.log(payload)
      
      const token = store.getters['auth/token']
      const setRating = [{
        ratingHolder: `users/${store.getters['auth/userId']}/rating/${payload.rating}/${payload.postId}`,
        source: payload.postId
      },
      {
        ratingHolder: `posts/${payload.postId}/rating/${payload.rating}/${payload.userId}`,
        source: payload.userId
      }]
      console.log('setRating', setRating)
      for(const el of setRating) {
        const url = `${process.env.VUE_APP_BASE_URL}/postli/${el.ratingHolder}.json?auth=${token}`
        const response = await axios.delete(url, el.source)
      }

      commit('removeRating',payload)
      store.commit('users/removeRating', payload)
    }
  },
  getters: {
    posts(state) {
      return state.posts
    }
  }
}

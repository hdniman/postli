import axios from "axios"
import store from ".."
import "../../axios/request.js";
import { getPostData } from "../../use/getData";
import { statusColor, ratingColor, ratingTitle } from '../../utils/alertsUtil'

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
      console.log('state.posts[idx]', state.posts[idx])
      if (state.posts[idx].rating == undefined) {
        state.posts[idx].rating = {}
      }
      if (state.posts[idx].rating[payload.rating] == undefined) {
        state.posts[idx].rating[payload.rating] = {}
      }
      delete state.posts[idx].rating[payload.rating][payload.userId]
    },
    deletePost(state, payload) {
      const idx = state.posts.findIndex(el => el.postId == payload)
      state.posts.splice(idx, 1)
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
      store.commit('users/addPostId', payload)
      store.dispatch('alerts/newMessage', {
        status: statusColor(response.status),
        title: 'Post created',
        text: payload.title
      })
    },

    async addToAuthor(_,payload) {
      const url = `${process.env.VUE_APP_BASE_URL}/postli/users/${payload.authorId}/postsId.json?auth=${payload.token}`
      const response = await axios.patch(url, {[payload.postId] : ''})
    },

    async setRating({commit}, payload) {
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
      store.dispatch('alerts/newMessage', {
        status: `Post ${ratingColor(payload.rating)}`,
        title: ratingTitle(payload.rating),
        text: getPostData(payload.postId).title
      })
    },

    async deleteRating({commit}, payload) {
      const token = store.getters['auth/token']
      const setRating = [{
        ratingHolder: `users/${store.getters['auth/userId']}/rating/${payload.rating}/${payload.postId}`,
        source: payload.postId
      },
      {
        ratingHolder: `posts/${payload.postId}/rating/${payload.rating}/${payload.userId}`,
        source: payload.userId
      }]
      for(const el of setRating) {
        const url = `${process.env.VUE_APP_BASE_URL}/postli/${el.ratingHolder}.json?auth=${token}`
        const response = await axios.delete(url, el.source)
      }
      commit('removeRating',payload)
      store.commit('users/removeRating', payload)
    },
    async deletePost({commit, dispatch}, payload) {
      const token = store.getters['auth/token']
      const url = `${process.env.VUE_APP_BASE_URL}/postli/posts/${payload.postId}.json?auth=${token}`
      const ratingData = getPostData(payload.postId).rating
      Object.keys(ratingData).forEach(rating => {
        Object.keys(ratingData[rating]).forEach(async userId => {
          store.dispatch('users/deleteUserRating', {rating: rating, postId: payload.postId, userId: userId})
        })
      })

      const response = await axios.delete(url)
      await store.dispatch('users/deletePostId', payload)
      commit('deletePost', payload.postId)
    }
  },
  getters: {
    posts(state) {
      return state.posts
    }
  }
}

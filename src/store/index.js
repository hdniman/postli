import { createStore } from 'vuex'
import createPost from "./posts/createPost";
import loadPosts from "./posts/loadPosts";
import auth from "./users/auth";
import createUser from "./users/createUser";
import loadUsers from "./users/loadUsers";

export default createStore({
  state() {
    return {
      user: {},
      users: {},
      posts: {}
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loadPosts,
    createPost,
    auth,
    createUser,
    loadUsers
  }
})

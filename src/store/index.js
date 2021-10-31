import { createStore } from 'vuex'
import posts from "./modules/posts";
import auth from "./modules/auth";
import users from "./modules/users";
import alerts from "./modules/alerts";

export default createStore({
  state() {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts,
    users,
    auth,
    alerts
  }
})

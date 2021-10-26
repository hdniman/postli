import axios from "axios";
import router from "../router";
import store from "../store";

axios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    console.log('notAuthorized')
    store.commit('auth/logout')
    router.push('/auth')
  }

  return Promise.reject(error);
})
import axios from "axios";
import router from "../router";
import store from "../store";
import { statusColor } from "../utils/alertsUtil";

axios.interceptors.response.use(null, error => {
  const status = error.response.status
  if (status === 401) {
    console.log('notAuthorized')
    store.commit('auth/logout')
    router.push('/auth')
    store.dispatch('alerts/newMessage', {
      status: statusColor(status),
      title: 'Your authorization token has expired',
      text: 'Please Log In'
    })
  }

  return Promise.reject(error);
})
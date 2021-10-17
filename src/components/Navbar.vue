<template>
  <div class="navbar">
      <img src="../assets/images/postli.svg" alt="">
    <div class="navbar-menu">
      <router-link to="/create">
        create
      </router-link>
      <a href="#">
        likes
      </a>
      <router-link to="/">
        main
      </router-link>
      <a href="#">
        profile
      </a>
      <a @click="login">
        {{isAuthenticated ? 'logout' : 'login'}}
      </a>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const login = () => {
      if (store.getters['auth/isAuthenticated']) {
        store.commit('auth/logout')
      } else {
        router.push('/auth')
      }
    }

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    return {
      isAuthenticated,
      login
    }
  }

}
</script>

<style>

</style>
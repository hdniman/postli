<template>
<router-view>

</router-view>
<alert-list></alert-list>
</template>

<script>
import AlertList from "./alert/AlertList.vue";
import { useStore } from 'vuex';
export default {
  async setup() {
    const store = useStore()

    const loadData = async() => {
      await store.dispatch('posts/loadPosts')
      await store.dispatch('users/loadUsers')
      store.commit('auth/getUserData')
    }
    await loadData()
  },
  components: {
    AlertList
  }
}
</script>

<style>

</style>

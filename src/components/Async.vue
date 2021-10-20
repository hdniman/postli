<template>
<router-view>

</router-view>
</template>

<script>
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
    
  }
}
</script>

<style>

</style>

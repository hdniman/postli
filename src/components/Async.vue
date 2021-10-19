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
      await store.dispatch('loadPosts/loadPosts')
      await store.dispatch('loadUsers/loadUsers')
      store.commit('auth/getUserData')
    }

    await loadData()
    
  }
}
</script>

<style>

</style>

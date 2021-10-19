<template>
<navbar></navbar>
<router-view>

</router-view>

</template>

<script>
import Navbar from "./components/Navbar.vue";
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';
export default {
  async setup() {
    const store = useStore()

    const loadData = async() => {
      store.dispatch('loadPosts/loadPosts')
      await store.dispatch('loadUsers/loadUsers')
      store.commit('auth/getUserData')
    }

    loadData()

    await onMounted(() => {console.log('mounted')})
    
  },
  components: {
    Navbar
    }
}
</script>

<style>

</style>

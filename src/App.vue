<template>
<navbar></navbar>
<router-view>

</router-view>

</template>

<script>
import Navbar from "./components/Navbar.vue";
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore()

    const loadData = async() => {
      store.dispatch('loadPosts/loadPosts')
      await store.dispatch('loadUsers/loadUsers')
      store.commit('auth/getUserData')
    }
    
    loadData()
    
  },
  components: {
    Navbar
    }
}
</script>

<style>

</style>

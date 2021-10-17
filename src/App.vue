<template>
<navbar></navbar>
<router-view>

</router-view>

</template>

<script>
import { onMounted } from '@vue/runtime-core';
import Navbar from "./components/Navbar.vue";
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore()
    onMounted(async() => {
      store.dispatch('loadPosts/loadPosts')
      await store.dispatch('loadUsers/loadUsers')
      store.commit('auth/getUserInfo')
    })
  },
  components: {
    Navbar
    }
}
</script>

<style>

</style>

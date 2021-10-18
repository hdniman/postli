<template>
<div>
    <div>
      <h1>
        {{$store.state.auth.userData}}
      </h1>
      <article>
        {{users}}
      </article>
      <button @click="test">read</button>
    </div>
        {{$store.state.loadPosts.posts}}
</div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    const posts = computed(() => store.getters['loadPosts/posts'])
    const users = computed(() => store.getters['loadUsers/users'])

    const test = () => store.commit('auth/getUserInfo')

    return {
      posts,
      users,
      test
    }
  }

}
</script>

<style>

</style>
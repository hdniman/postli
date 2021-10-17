<template>
<div>
    <div>
      <h1>
        {{$store.state.auth.userInfo}}
      </h1>
      <article>
        {{users}}
      </article>
      <button @click="test">read</button>
    </div>
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

    return {
      posts,
      users
    }
  }

}
</script>

<style>

</style>
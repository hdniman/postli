<template>
<h1>posts</h1>
  <post
  v-for="post in posts"
  :key="post.postId"
  :post="post">>
  </post>
  
</template>

<script>
import Post from "./PostItem.vue";
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    const posts = computed(() => store.getters['loadPosts/posts'])

    return{
      posts
    }
  },
  components: {
    Post
  }

}
</script>

<style>

</style>
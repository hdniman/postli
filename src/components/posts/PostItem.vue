<template>
  <div class="card" @click="open">
    <div class="split">
      <h2>{{post.title}}</h2>
      <h2>{{new Date(post.time).toLocaleDateString()}}</h2>
    </div>
    <div>
      Description: {{post.description}}
    </div>
    <div v-if="isOpen">
      <p>
        {{post.articleBody}}
      </p>
      <router-link :to="`/post/${post.postId}`" @click.stop>go to post</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props: ['post'],
  setup() {
    
    const isOpen = ref(false)

    const open = () => isOpen.value = !isOpen.value

    return {
      isOpen,
      open
    }
  }

}
</script>

<style scoped>

</style>
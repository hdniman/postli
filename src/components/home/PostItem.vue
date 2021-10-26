<template>
  <div class="card" @click="open">
    <div class="split">
      <h2>{{post.title}}</h2>
      <h2>{{new Date(post.time).toLocaleDateString()}}</h2>
    </div>
    <div>
      <h4>Author: 
        <router-link v-if="authorNickname" class="user-url" :to="isOpen ? `/user/${post.authorId}` : '/'">
          {{authorNickname}}
        </router-link>
        <template v-else>
          not-found
        </template>
      </h4>
      <div v-if="post.description">
        Description: {{post.description}}
      </div>
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
import { getUserData } from '../../use/getData'
export default {
  props: ['post'],
  setup(props) {
    
    const isOpen = ref(false)

    const open = () => isOpen.value = !isOpen.value

    const authorNickname = getUserData(props.post.authorId, 'userId').nickname
    
    

    return {
      isOpen,
      open,
      authorNickname
    }
  }

}
</script>

<style scoped>

</style>
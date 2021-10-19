<template>
  <div class="card" @click="open">
    <div class="split">
      <h2>{{post.title}}</h2>
      <h2>{{new Date(post.time).toLocaleDateString()}}</h2>
    </div>
    <div>
      <h4>Author: 
        <router-link :to="`/user/${post.authorId}`">
          {{authorNickname ? authorNickname : ''}}
        </router-link>
      </h4>
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
import { getUserData } from '../../use/getUserData'
import { onMounted } from '@vue/runtime-core'
export default {
  props: ['post'],
  setup(props) {
    
    const isOpen = ref(false)
    const authorNickname = ref('')

    const open = () => isOpen.value = !isOpen.value
    
    onMounted(() => {
      try {
        authorNickname.value = getUserData(props.post.authorId, 'userId').nickname
      } catch (error) {console.log(error)}
      })

    return {
      isOpen,
      open,
      authorNickname
    }
  }

}
</script>

<style scoped>

a {
  color: black;
  font-style: italic;
  font-size: 1em;
}

</style>
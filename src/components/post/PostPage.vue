<template>
  <div class="card">
    <div class="split">
    <h1>{{postData.title}}</h1>
    <router-link to="/">back</router-link>
    </div>
    <div class="split">
    <h2>{{postData.description}}</h2>
    <h2>{{new Date(postData.time).toLocaleDateString()}}</h2>
    </div>
    <p>{{postData.articleBody}}</p>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { getPostData } from '../../use/getPostData'
export default {
  setup() {
    const route = useRoute()

    const postData = ref({
      authorId: '',
      title: '',
      description: '',
      articleBody: '',
      time: '',
      likes: [],
      dislikes: []
    })
    postData.value = getPostData(route.params.postId)
    
    return {
      postData
    }
  }

}
</script>

<style>

</style>
<template>
  <div class="card">
    <div class="split">
      <router-link class="user-url" :to="`/user/${postData.authorId}`">
        {{authorNickname ? authorNickname : ''}}
      </router-link>
      <router-link to="/">back</router-link>
    </div>
    <div class="split">
      <h2>{{postData.title}}</h2>
      <h2>{{new Date(postData.time).toLocaleDateString()}}</h2>
    </div>
    <h3>{{postData.description}}</h3>
    <p>{{postData.articleBody}}</p>
    <button>Like</button>
    <button>Dislike</button>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { getPostData } from '../../use/getPostData'
import { getUserData } from '../../use/getUserData'
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

    const authorNickname = getUserData(postData.value.authorId, 'userId').nickname
    
    return {
      postData,
      authorNickname
    }
  }

}
</script>

<style>

.user-url {
  color: black;
  font-style: italic;
  font-weight: 700;
}

</style>
<template>
  <div class="card">
    <div class="split">
      <router-link class="user-url" :to="`/user/${postData.authorId}`">
        {{authorNickname}}
      </router-link>
      <router-link to="/">back</router-link>
    </div>
    <div class="split">
      <h2>{{postData.title}}</h2>
      <h2>{{new Date(postData.time).toLocaleDateString()}}</h2>
    </div>
    <h3>Description: {{postData.description}}</h3>
    <p>{{postData.articleBody}}</p>
    <button :disabled="userRate == 'like'" @click="ratePost('likes')">Like: {{rating.likes.length}}</button>
    <button :disabled="userRate == 'dislike'" @click="ratePost('dislikes')">Dislike: {{rating.dislikes.length}}</button>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { getPostData } from '../../use/getData'
import { getUserData } from '../../use/getData'
import { useStore } from 'vuex'
export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    const postData = ref(getPostData(route.params.postId))

    const userData = ref(getUserData(postData.value.authorId, 'userId'))

    console.log(postData.value.rating.hasOwnProperty('likes'))

    const rating = ref({
      likes: postData.value.rating.hasOwnProperty('likes') ? Object.keys(postData.value.rating.likes) : [],
      dislikes: postData.value.rating.hasOwnProperty('dislikes') ? Object.keys(postData.value.rating.dislikes) : []
    })

    console.log('ratingratingrating', rating.value.likes)

    const userRate = computed(() => {
      const userId = userData.value.userId
      console.log('userId', userId)
      console.log('rating', rating.value.likes)
      console.log('userRate', rating.value.likes.find(el => el == userId))
      if (rating.value.likes.find(el => el == userId)) {
        return 'like'
      } else if (rating.value.dislikes.find(el => el == userId)) {
        return 'dislike'
      }
    })

    const ratePost = (rating) => {
      console.log(rating)
      store.dispatch('posts/ratePost', {rating, postId: postData.value.postId, userId: store.getters['auth/userId']})
    }
    
    return {
      postData,
      authorNickname: userData.nickname,
      ratePost,
      rating,
      userRate
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
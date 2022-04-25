<template>
  <div>
   <div class="card">
     <div class="split">
       <router-link class="user-url" :to="`/user/${postData.authorId}`">
         {{authorNickname}}
       </router-link>
       <a @click="back">back</a>
     </div>
     <div class="split">
       <h2>{{postData.title}}</h2>
       <h2>{{new Date(postData.time).toLocaleDateString()}}</h2>
     </div>
     <h3>Description: {{postData.description}}</h3>
     <p>{{postData.articleBody}}</p>
     <button
     :class="userRating == 'likes' && userRating !== 'dislikes' ? 'primary' : ''"
     @click="ratePost('likes')">
       Like: {{Object.keys(postData.rating.likes).length}}
     </button>
     <button
     style="margin-left: 10px;"
     :class="userRating == 'dislikes' && userRating !== 'likes' ? 'disliked' : 'warning'"
     @click="ratePost('dislikes')">
       Dislike: {{Object.keys(postData.rating.dislikes).length}}
     </button>
     <button
     class="danger deleteButton"
     v-if="userId == postData.authorId"
     @click="deleteRequest">Delete</button>
   </div>
   <confirm-modal
   v-if="modal"
   @confirm="deletePost"
   @reject="deleteRequest">
    Do you want to delete "{{postData.title}}"?
   </confirm-modal>
  </div>
</template>

<script>
import ConfirmModal from "../ui/ConfirmModal.vue";
import { computed, ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { getPostData, getUserData } from '../../use/getData'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const auth = computed(() => store.getters['auth/isAuthenticated'])

    const postData = ref(getPostData(route.params.postId))

    const userData = ref(getUserData(postData.value.authorId, 'userId'))
    if (postData.value.rating == undefined) {
      postData.value.rating = {}
    }
    if (postData.value.rating.likes == undefined) {
      postData.value.rating.likes = {}
    }
    if (postData.value.rating.dislikes == undefined) {
      postData.value.rating.dislikes = {}
    }

    const userId = computed(() => store.getters['auth/userId'])

    const userRating = computed(() => {
      if (Object.keys(postData.value.rating.likes).find(el => el == userId.value)) {
        return 'likes'
      } else if (Object.keys(postData.value.rating.dislikes).find(el => el == userId.value)) {
        return 'dislikes'
      }
    })

    const ratePost = (rating) => {
      console.log('auth',auth)
      if (auth.value) {
        console.log('rated')
        if (userRating.value == undefined) {
          store.dispatch('posts/setRating', {rating, postId: postData.value.postId, userId: userId.value})        
        } else if (userRating.value == rating){
          store.dispatch('posts/deleteRating', {rating, postId: postData.value.postId, userId: userId.value})
        } else if (userRating.value !== rating)   {
          store.dispatch('posts/deleteRating', {rating: userRating.value, postId: postData.value.postId, userId: userId.value}) 
          store.dispatch('posts/setRating', {rating, postId: postData.value.postId, userId: userId.value})
        }
      } else {
        console.log('go auth')
        router.push('/auth')
      }
    }
    const back = () => {router.go(-1)}

    const modal = ref(false)
    const deleteRequest = () => modal.value = !modal.value
    const deletePost = async () => {
      deleteRequest()
      await store.dispatch('posts/deletePost', {postId: postData.value.postId, userId: userId.value})
      router.go(-1)
    }
    
    return {
      postData,
      authorNickname: userData.value.nickname,
      ratePost,
      userRating,
      userData,
      auth,
      back,
      userId,
      modal,
      deleteRequest,
      deletePost
    }
  },
  components: {
    ConfirmModal
  }

}
</script>

<style>

.disliked {
  color: #721b20;
  background-color: #cf373e;
  border-color: #721b20;
}

.deleteButton {
  float: right;
}

@media screen and (max-width: 400px) {
  .deleteButton {
    display: none;
  }
}
</style>
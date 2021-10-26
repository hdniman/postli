<template>
  <div class="card">
    <div v-if="canEdit" class="settingsButton">
      <router-link class="toSettings" to="/profile">Settings</router-link>
    </div>
    <div class="header">
      <img class="image" :src="userData.photo"/>
        <div>
          <h1>{{userData.nickname}}</h1>
          <h2>Likes: N/A</h2>
          <h2>Dislikes: N/A</h2>
        </div>
      </div>
    <div>
      <h1>About:</h1>
      <article>
        {{userData.about}}
      </article>
    </div>
    <div v-if="userData.postsId">
      <h1>Posts:</h1>
        <user-post v-for="userPostId in Object.keys(userData.postsId)" :key="userPostId" :userPostId="userPostId">
        </user-post>
    </div>
  </div>
</template>

<script>
import UserPost from "./UserPost.vue";
import { useRoute } from 'vue-router'
import { getUserData } from "../../use/getData";
import { computed, ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  setup() {
    const route = useRoute()

    const userData = ref({
      nickname: '',
      photo: '',
      about: '',
      postsId: {}
    })

    const userId = computed(() => route.params.userId)
    
    const refresh = () => {userData.value = getUserData(userId.value, 'userId')}

    refresh()
    
    const userRoute = computed(() => route.params)
    

    watch(userRoute, ( to) => {
      if (to.userId) {
      refresh()
      }})

    const store = useStore()
    const authId = ref(store.getters['auth/userId'])

    const canEdit = computed(() => {
      if (authId.value == userId.value) {
        return true
      } else {
        return false
      }
    })

    return {
      userData,
      canEdit
    }
  },
  components: {
    UserPost
  }
}
</script>

<style scoped>

.header {
  display: flex;
  height: 150px;
  position: relative;
}

.settingsButton {
  float: right;
}

h1, h2 {
  margin: 10px 15px;
}

</style>
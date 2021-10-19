<template>
  <div class="card">
    <div class="header">
      <router-link class="toSettings" to="/profile">Settings</router-link>
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
    <div>
      <h1>Posts:</h1>
        <user-post v-for="userPostId in Object.keys(userData.postsId)" :key="userPostId" :userPostId="userPostId">
        </user-post>
    </div>
  </div>
</template>

<script>
import UserPost from "./UserPost.vue";
import { useRoute } from 'vue-router'
import { getUserData } from "../../use/getUserData";
import { computed, ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
export default {
  setup() {
    const route = useRoute()

    const userData = ref({
      nickname: '',
      photo: '',
      about: '',
      postsId: []
    })
    
    const refresh = () => {userData.value = getUserData(route.params.userId, 'userId')}

    refresh()
    
    const userRoute = computed(() => route.params)

    console.log()
    

    watch(userRoute, (n) => {
      if (n.userId) {
      refresh()
      }})

    return {
      userData
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

h1, h2 {
  margin: 10px 15px;
}

.toSettings {
  position: absolute;
  left: 90%;
}

</style>
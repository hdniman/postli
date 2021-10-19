<template>
  <div class="card">
    <div class="header">
      <img class="image" :src="userDate.photo"/>
      <div>
        <h1>{{userDate.nickname}}</h1>
        <h1>Likes: N/A</h1>
        <h1>Dislikes: N/A</h1>
      </div>
    </div>
    <div>
      <h1>About:</h1>
      <article>
        {{userDate.about}}
      </article>
    </div>
    <div>
      <h1>Posts:</h1>
        <user-post v-for="userPostId in Object.keys(userDate.postsId)" :key="userPostId" :userPostId="userPostId">
        </user-post>
    </div>
  </div>
</template>

<script>
import UserPost from "./UserPost.vue";
import { useRoute } from 'vue-router'
import { getUserData } from "../../use/getUserData";
export default {
  setup() {
    const route = useRoute()

    const userDate = getUserData(route.params.userId, 'userId')

    return {
      userDate
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
}

h1 {
  margin: 10px 15px;
}

</style>
<template>
<div class="card">
  <div class="split">
    <h2>{{userPostData.title}}</h2>
    <router-link :to="`/post/${userPostId}`">go post</router-link>
  </div>
  <h2>{{userPostData.description}}</h2>
  <p>{{userPostData.articleBody}}</p>
</div>
  
</template>

<script>
import { getPostData } from "../../use/getPostData";
export default {
  props: ['userPostId'],
  setup(props) {

    const userPostData = getPostData(props.userPostId)

    return {
      userPostData
    }
  }

}
</script>

<style>

</style>
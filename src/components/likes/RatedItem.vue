<template>
  <router-link custom v-slot="{ navigate }" :to="`/post/${ratedItem}`">
    <div class="card" @click="navigate">
      <h3>{{postData.title}}</h3>
      <h4>{{postData.description}}</h4>
    </div>
  </router-link>
</template>

<script>
import { getPostData } from '../../use/getData'
export default {
  props: ['ratedItem'],
  setup(props) {
    const postData = getPostData(props.ratedItem)

    return {
      postData
    }
  }

}
</script>

<style>

</style>
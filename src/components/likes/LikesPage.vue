<template>
  <div class="card">
    <h1>
      likes
    </h1>
    <rated-item v-for="ratedItem in ratingData" :key="ratedItem" :ratedItem="ratedItem"></rated-item>
    <h3 v-if="ratingData.length == 0">You haven't liked anything yet!</h3>
  </div>
</template>

<script>
import RatedItem from "./RatedItem.vue";
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    const userData = ref(store.getters['auth/userData'])
    if (userData.value.rating == undefined) {
      userData.value.rating = {}
    }
    if (userData.value.rating.likes == undefined) {
      userData.value.rating.likes = {}
    }
    if (userData.value.rating.dislikes == undefined) {
      userData.value.rating.dislikes = {}
    }
    
    const ratingData = ref(Object.keys(userData.value.rating.likes))


    return {
      ratingData
    }
  },
  components: {
    RatedItem
  }

}
</script>

<style>

</style>
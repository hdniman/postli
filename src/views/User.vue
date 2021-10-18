<template>
  <div class="card">
    <div class="inline">
      <img class="image" src="https://sun9-87.userapi.com/impg/f8a2tU903Hwr7voyaZxZdesNNHcYQr-3EuD1dw/KJJ7nJON-BE.jpg?size=810x1080&quality=96&sign=868f66f3ee81467eaf311ae44f49aee4&type=album"/>
      <h1>{{userDate}}</h1>
    </div>
    <button @click="test">test</button>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { getUserData } from "../use/getUserData";
export default {
  setup() {
    const route = useRoute()

    const userDate = getUserData(route.params.userId, 'userId')

    return {
      userDate
    }
  }
}
</script>

<style>

</style>
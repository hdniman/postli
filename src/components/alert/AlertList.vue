<template>
  <div class="alert">
    <alert-item v-for="message in messages" :key="message.title" :message="message"></alert-item>

  </div>
</template>

<script>
import { useStore } from 'vuex';
import AlertItem from "./AlertItem.vue";
export default {
  setup() {
    const store = useStore()
    const messages = store.getters['alerts/messages']
    return {
      messages
    }
  },
  components:{
    AlertItem
  }

}
</script>

<style scoped>

.alert {
  width: 320px;
  position: fixed;
  right: 20px;
  bottom: 20px;
}

</style>
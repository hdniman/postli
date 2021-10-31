<template>
  <div :class="['alert-card',message.status]">
    <div class="split">
      <h3>{{message.title}}</h3>
      <span class="sidebar-close" @click="close">&times;</span>
    </div>
    <p>{{message.text}}</p>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  props: ['message'],
  setup(props) {
    const store = useStore()
    const close = () => {
      store.commit('alerts/deleteMessage', props.message.key)
    }
    return {
      close
    }
  }

}
</script>

<style scoped>

.alert-card {
  margin: 15px -20px;
  padding: 10px;
  width: 320px;
  border-radius: 15px;
  background-color: #ffffff;
  opacity: 0.3;
}

.sidebar-close {
    font-size: 1.4rem;
    cursor: pointer;
}

.alert-card:hover {
  opacity: 1;
}

.success {
  background-color: #2fc242;
}

.primary {
  background-color: #5aa2cc;
}

.danger {
  background-color:#cf373e;
}

.warning {
  background-color:#da7531;
}

</style>
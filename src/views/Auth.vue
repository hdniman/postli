<template>
<div class="card">
<log-in v-if="!newUser"></log-in>
<sign-up v-else></sign-up>
<a @click="newUser = !newUser"><small>{{newUser ? 'Has an account? LogIn' : 'New user? SignUp'}}</small></a>
</div>
</template>

<script>
import { ref } from '@vue/reactivity';
import LogIn from "../components/auth/LogIn.vue";
import SignUp from "../components/auth/SignUp.vue";
export default {
  setup() {
    const newUser = ref(false)
    return {
      newUser
    }
  },
  components:{
    LogIn,
    SignUp
    }
}
</script>

<style>

</style>
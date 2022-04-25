<template>
  <form @submit.prevent="onSubmit">
    <h1>Log in PostLi</h1>
    <div class="form-control">
      <label for="email">Email</label>
      <input :class="{danger:  (eError && notFirstTry)}" id="email" type="email" v-model="email"  @blur="eBlur"/>
      <small class="error" v-if="eError && notFirstTry">{{eError}}</small>
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input :class="{danger:  (pError && notFirstTry)}" id="password" type="password" v-model="password" @blur="pBlur"/>
      <small class="error" v-if="pError && notFirstTry">{{pError}}</small>
    </div>
    <button @click="notFirstTry = true">Log In</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useLoginForm } from "../../use/forms/login-form";
export default {
  setup() {
    const notFirstTry = ref(false)
    return {
      ...useLoginForm(),
      notFirstTry
    }
  }

}
</script>

<style>

</style>
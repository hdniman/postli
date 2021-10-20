<template>
  <form @submit.prevent="onSubmit">
    <h1>Log in PostLi</h1>
    <div class="form-control">
      <label for="email">Email</label>
      <input :class="{danger:  eError}" id="email" type="email" v-model="email"  @blur="eBlur"/>
      <small class="error" v-if="eError">{{eError}}</small>
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input :class="{danger:  pError}" id="password" type="password" v-model="password" @blur="pBlur"/>
      <small class="error" v-if="pError">{{pError}}</small>
    </div>
    <button>Log In</button>
  </form>
</template>

<script>
import { useLoginForm } from "../../use/forms/login-form";
export default {
  setup() {
    return {
      ...useLoginForm()
    }
  }

}
</script>

<style>

</style>
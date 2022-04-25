<template>
  <form @submit.prevent="onSubmit">
    <h1>Sing up PostLi</h1>
    <div class="form-control">
      <label for="email">Email</label>
      <input :class="{danger : (neError && notFirstTry)}" id="email" type="email" v-model="nemail" @blur="neBlur" />
      <small class="error" v-if="neError && notFirstTry">{{neError}}</small>
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input :class="{danger : (npError && notFirstTry)}" id="password" type="password" v-model="npassword" @blur="npBlur "/>
      <small class="error" v-if="npError && notFirstTry">{{npError}}</small>
    </div>
    <button @click="notFirstTry = true">Sign Up</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useSignUpForm } from "../../use/forms/signup-form";
export default {
  setup() {
    const notFirstTry = ref(false)
    return {
      ...useSignUpForm(),
      notFirstTry
    }
  }

}
</script>

<style>

</style>
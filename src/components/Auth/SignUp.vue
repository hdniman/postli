<template>
  <form @submit.prevent="onSubmit">
    <h1>Sing up PostLi</h1>
    <div class="form-control">
      <label for="email">Email</label>
      <input :class="{danger : neError}" id="email" type="email" v-model="nemail" @blur="neBlur" />
      <small class="error">{{neError}}</small>
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input :class="{danger : npError}" id="password" type="password" v-model="npassword" @blur="npBlur "/>
      <small class="error">{{npError}}</small>
    </div>
    <button>Sign Up</button>
  </form>
</template>

<script>
import { useSignUpForm } from "../../use/forms/signup-form";
export default {
  setup() {


    return {
      ...useSignUpForm()
    }
  }

}
</script>

<style>

</style>
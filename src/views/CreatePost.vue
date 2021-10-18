<template>
  <form @submit.prevent="onSubmit">
    <div class="card">
      <div class="split">
        <h1>Confirm</h1>
        <button class="btn">Create</button>
      </div>
      <div class="test">
        <div class="form-control">
          <input id="name" type="text" v-model="title" @blur="tBlur" />
        </div>
      </div>
      <small class="error" v-if="tError">
        {{tError}}
      </small>
    </div>
    <div class="card">
      <div class="form-control">
        <label for="article">Article</label>
        <textarea id="article" v-model="articleBody" @blur="aBlur"></textarea>
      </div>
      <small class="error" v-if="aError">{{aError}}</small>
    </div>
  </form>
</template>

<script>
  import { usePostForm } from "../use/post-form";
  export default {
    setup() {

      return {
        ...usePostForm()
      }
    }

  }
</script>

<style scoped>
  .text {
    display: flex;
  }
</style>>
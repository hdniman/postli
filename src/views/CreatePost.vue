<template>
  <form @submit.prevent="onSubmit">
    <div class="card">
      <div class="split">
        <h2>Confirm</h2>
        <button class="btn" :disabled="!userId">Create</button>
      </div>
      <div>
        <div class="form-control">
        <label for="title">Title: </label>
          <input id="title" type="text" v-model="title" @blur="tBlur" />
        </div>
        <small class="error" v-if="tError">
          {{tError}}
        </small>
      </div>
      <div>
        <div class="form-control">
          <label for="description">Description: </label>
          <input id="description" type="text" v-model="description" @blur="dBlur" />
        </div>
        <small class="error" v-if="dError">
          {{dError}}
        </small>
      </div>
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
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
  import { usePostForm } from "../use/post-form";
  export default {
    setup() {
      const store = useStore()

      const userId = computed(() => store.getters['auth/userId'])
      

      return {
        ...usePostForm(),
        userId
      }
    }

  }
</script>

<style scoped>
  .text {
    display: flex;
  }
</style>>
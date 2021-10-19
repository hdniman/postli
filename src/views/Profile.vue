<template>
  <form class="card" @submit.prevent="changeUser.onSubmit">
    <h1>Personal info</h1>
    <img class="image" :src="myData.photo">
    <div class="form-control">
      <label label for="photo">Photo</label>
      <input id="photo" type="text" v-model="changeUser.photo">
    </div>
    <div class="form-control">
      <label label for="nickname">Nickname</label>
      <input id="nickname" type="text" v-model="changeUser.nickname">
    </div>
    <div class="form-control">
      <label label for="about">About</label>
      <input id="about" type="text" v-model="changeUser.about">
    </div>
    <button v-if="!hasChanges" :disabled="hasChanges">Change</button>
  </form>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useChangeUserForm } from "../use/changeUser-form";
export default {
  setup() {
    const store = useStore()

    const myData = ref({...store.getters['auth/userData']})
    
    const changeUser = ref({...useChangeUserForm()})

    changeUser.value.nickname = myData.value.nickname
    changeUser.value.photo = myData.value.photo
    changeUser.value.about = myData.value.about

    const hasChanges = computed(() => {
      if (
        changeUser.value.nickname == myData.value.nickname &&
        changeUser.value.photo == myData.value.photo &&
        changeUser.value.about == myData.value.about
      ) {
        return true
      } else {
        return false
      }
    })

    return {
      myData,
      changeUser,
      hasChanges
    }
  }

}
</script>

<style>

</style>
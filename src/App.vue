<template>
<navbar></navbar>

<suspense>
  <template #default>
    <async></async>
  </template>
  <template #fallback>
    <div class="loader">Loading...</div>
  </template>
</suspense>

</template>

<script>
import Navbar from "./components/Navbar.vue";
import Async from "./components/Async.vue";
export default {
  components: {
    Navbar,
    Async
    }
}
</script>

<style>

</style>

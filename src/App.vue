<template>
<navbar></navbar>

<suspense>
  <template #default>
    <async></async>
  </template>
  <template #fallback>
    <h1>Loading...</h1>
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

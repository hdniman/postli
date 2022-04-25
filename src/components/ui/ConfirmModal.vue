<template>
  <div class="modal">
    <div class="card-modal">
      <h1>Confirm</h1>
      <slot></slot>
      <div class="split">
        <button @click="$emit('confirm')">Yes</button>
        <button @click="$emit('reject')">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['confirm', 'reject']
}
</script>

<style scoped>

.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #00000050;
}

.card-modal {
  box-sizing: border-box;
  width: 400px;
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  margin: 15% auto 0;
}

</style>
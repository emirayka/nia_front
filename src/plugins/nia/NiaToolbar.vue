<template>
  <b-button-toolbar class="nia-toolbar">
    <slot></slot>
  </b-button-toolbar>
</template>

<script>
  export default {
    name: "NiaToolbar",
  }
</script>

<style scoped>
  .nia-toolbar {
    background-color: #777777;
    color: #ffffff;
  }
</style>

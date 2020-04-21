<template>
  <b-navbar class="nia-navbar">
    <slot></slot>
  </b-navbar>
</template>

<script>
  export default {
    name: "NiaNavbar",
  }
</script>

<style scoped>
  .nia-navbar {
    background-color: #777777;
    color: #ffffff;
  }
</style>

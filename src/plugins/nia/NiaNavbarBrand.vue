<template>
  <b-navbar-brand class="nia-navbar-brand">
    <slot></slot>
  </b-navbar-brand>
</template>

<script>
  export default {
    name: "NiaNavbarBrand",
  }
</script>

<style scoped>
  .nia-navbar-brand {
    background-color: #777777;
    color: #ffffff;
  }
</style>
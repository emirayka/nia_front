<template>
  <b-navbar-nav class="nia-navbar-nav">
    <slot></slot>
  </b-navbar-nav>
</template>

<script>
  export default {
    name: "NiaNavbarNav",
  }
</script>

<style scoped>
  .nia-navbar-nav {
    background-color: #777777;
    color: #ffffff;
  }

  .nia-navbar-nav .nav-link {
    color: #ffffff !important;
  }
</style>
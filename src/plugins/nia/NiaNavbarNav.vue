<template>
  <b-navbar-nav class="nia-navbar-nav">
    <slot></slot>
  </b-navbar-nav>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: "NiaNavbarNav",
  })
  export default class NiaNavbarNav extends Vue {
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
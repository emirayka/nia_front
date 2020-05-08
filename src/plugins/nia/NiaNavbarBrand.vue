<template>
  <b-navbar-brand class="nia-navbar-brand">
    <slot></slot>
  </b-navbar-brand>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: "NiaNavbarBrand",
  })
  export default class NiaNavbarBrand extends Vue {
  }
</script>

<style scoped>
  .nia-navbar-brand {
    background-color: #777777;
    color: #ffffff;
  }
</style>
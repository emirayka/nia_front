<template>
  <b-navbar class="nia-navbar">
    <slot></slot>
  </b-navbar>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: "NiaNavbar",
  })
  export default class NiaNavbar extends Vue {
  }
</script>

<style scoped>
  .nia-navbar {
    background-color: #777777;
    color: #ffffff;
  }
</style>

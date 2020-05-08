<template>
  <b-button-toolbar class="nia-toolbar">
    <slot></slot>
  </b-button-toolbar>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: "NiaToolbar",
  })
  export default class NiaToolbar extends Vue {
  }
</script>

<style scoped>
  .nia-toolbar {
    background-color: #777777;
    color: #ffffff;
  }
</style>

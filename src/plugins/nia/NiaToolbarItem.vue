<template>
  <button class="nia-toolbar-item">
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: "NiaToolbarItem",
  })
  export default class NiaToolbarItem extends Vue {
  }
</script>

<style scoped>
  .nia-toolbar-item {
    margin-left: 5px;
    background-color: #777777;
    color: #ffffff;
  }
</style>

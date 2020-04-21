<template>
  <b-button class="nia-toolbar-item">
    <slot></slot>
  </b-button>
</template>

<script>
  export default {
    name: "NiaToolbarItem",
  }
</script>

<style scoped>
  .nia-toolbar-item {
    margin-left: 5px;
    background-color: #777777;
    color: #ffffff;
  }
</style>

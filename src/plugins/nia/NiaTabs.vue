<template>
  <b-tabs class="nia-tabs">
    <slot></slot>
  </b-tabs>
</template>

<script>
  export default {
    name: "NiaTabs",
  }
</script>

<style scoped>
  .nia-tabs {
    background-color: #777777;
    color: #ffffff;
  }
</style>
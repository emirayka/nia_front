<template>
  <b-tabs class="nia-tabs">
    <slot></slot>
  </b-tabs>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    name: "NiaTabs",
  })
  export default class NiaTabs extends Vue {
  }
</script>

<style scoped>
  .nia-tabs {
    background-color: #777777;
    color: #ffffff;
  }
</style>
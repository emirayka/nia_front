<template>
  <div class="nia-navbar">
    <slot></slot>
  </div>
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
    -webkit-tap-highlight-color: rgba(0,0,0,0);

    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    box-sizing: border-box;
    position: relative;
    padding: .5rem 1rem;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: flex-start;
    background-color: # !important;
  }
</style>

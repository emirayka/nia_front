<template>
  <ul
    class="nia-navbar-nav"
    :style="style"
  >
    <slot></slot>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'

  @Component({
    name: "NiaNavbarNav",
  })
  export default class NiaNavbarNav extends Vue {
    get style(): object {
      return {
        color: store.getters.Theme.getForegroundColor,
      }
    }
  }
</script>

<style scoped>
  .nia-navbar-nav {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    list-style: none;

    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;

    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;

    background-color: transparent;
  }
</style>
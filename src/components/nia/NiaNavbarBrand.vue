<template>
  <div
    class="nia-navbar-brand"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'

  @Component({
    name: "NiaNavbarBrand",
  })
  export default class NiaNavbarBrand extends Vue {
    get style(): object {
      return {
        color: store.getters.Theme.getForegroundColorAccent1,
      }
    }
  }
</script>

<style scoped>
  .nia-navbar-brand {
    box-sizing: border-box;
    display: inline-block;

    font-size: 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-weight: 600;
    font-style: italic;
    line-height: inherit;

    white-space: nowrap;
    text-align: left;
    text-decoration: none;
    user-select: none;

    margin-right: 1rem;

    background-color: transparent;
  }

  .nia-navbar-brand:hover {
    cursor: default;
  }
</style>
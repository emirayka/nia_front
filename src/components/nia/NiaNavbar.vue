<template>
  <div
    class="nia-navbar"
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
    name: "NiaNavbar",
  })
  export default class NiaNavbar extends Vue {
    get style(): object {
      return {
        backgroundColor: store.getters.ThemeModule.getBackgroundColor,
        color: store.getters.ThemeModule.getForegroundColor,
      }
    }
  }
</script>

<style scoped>
  .nia-navbar {
    box-sizing: border-box;
    position: relative;

    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: flex-start;

    padding: .5rem 1rem;

    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
  }
</style>

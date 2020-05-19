<template>
  <div
    class="nia-toolbar"
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
    name: "NiaToolbar",
  })
  export default class NiaToolbar extends Vue {
    get style(): object {
      return {
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
      }
    }
  }
</script>

<style scoped>
  .nia-toolbar {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
  }
</style>

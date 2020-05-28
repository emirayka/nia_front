<template>
  <li
    class="nia-context-menu-item"
    :style="style"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.prevent.stop="$emit('click')"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'

  @Component({
    name: 'NiaContextMenuItem',
  })
  export default class NiaContextMenuItem extends Vue {
    hover = false

    get style(): object {
      const backgroundColor: string = this.hover
        ? store.getters.Theme.getForegroundColorAccent1
        : store.getters.Theme.getBackgroundColor

      const color: string = this.hover
        ? store.getters.Theme.getBackgroundColorAccent1
        : store.getters.Theme.getForegroundColor

      return {
        backgroundColor,
        color,
      }
    }
  }
</script>

<style scoped>
  .nia-context-menu-item {
    display: flex;
    cursor: pointer;
    padding: 8px 15px;
    align-items: center;
    border: 0;
  }

  .nia-context-menu-item:hover {
    background-color: darkgoldenrod;
  }
</style>
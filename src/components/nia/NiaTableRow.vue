<template>
  <tr
    class="nia-table-row"
    :style="style"
    @click="$emit('click', $event)"
    @mouseover="$emit('hover', true)"
    @mouseleave="$emit('hover', false)"
  >
    <slot></slot>
  </tr>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'

  @Component({
    name: 'NiaTableRow',
  })
  export default class NiaTableRow extends Vue {
    get style(): object {
      return {
        color: store.getters.Theme.getForegroundColor2,
        backgroundColor: store.getters.Theme.getBackgroundColor2,
      }
    }
  }
</script>

<style scoped>
  .nia-table-row {
    width: 100%;

    line-height: 1.15;
    font-family: Montserrat, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-color: #46637f;

    transition: all 0.25s ease-in;
  }
</style>
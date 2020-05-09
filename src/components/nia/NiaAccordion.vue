<template>
  <div
    class="accordion box"
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
    name: 'NiaAccordion',
  })
  export default class NiaAccordion extends Vue {
    get style(): object {
      return {
        backgroundColor: store.getters.ThemeModule.getBackgroundColor,
        color: store.getters.ThemeModule.getForegroundColor,
      }
    }
  }
</script>

<style scoped>
  .accordion {
    padding: 0;
    margin: 0;
  }
</style>

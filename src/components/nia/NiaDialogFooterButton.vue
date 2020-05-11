<template>
  <NiaButton
    class="nia-dialog-footer-button"
    @click.stop="$emit('click', $event)"
  >
    <slot></slot>
  </NiaButton>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'

  @Component({
    name: 'NiaDialogFooterButton',
  })
  export default class NiaDialogFooterButton extends Vue {
  }
</script>

<style scoped>
  .nia-dialog-footer-button {
    display: block;
    flex: 1;
  }

  .nia-dialog-footer-button:not(:first-child) {
    margin-left: 10px;
  }
</style>

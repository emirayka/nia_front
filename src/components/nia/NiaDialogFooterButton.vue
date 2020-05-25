<template>
  <NiaButton
    class="nia-dialog-footer-button"
    :danger="danger"
    :success="success"
    @click.stop="$emit('click', $event)"
  >
    <slot></slot>
  </NiaButton>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'

  @Component({
    name: 'NiaDialogFooterButton',
  })
  export default class NiaDialogFooterButton extends Vue {
    @Prop({ default: false })
    danger!: boolean

    @Prop({ default: false })
    success!: boolean
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

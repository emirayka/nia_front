<template>
  <button
    class="nia-button"
    :style="style"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaButton',
  })
  export default class NiaButton extends Vue {
    @Prop({ required: false })
    danger = false

    @Prop({ required: false })
    success = false

    get style(): object {
      const backgroundColor: string = this.danger
        ? store.getters.ThemeModule.getBackgroundColorError1
        : this.success
          ? store.getters.ThemeModule.getBackgroundColorSuccess1
          : store.getters.ThemeModule.getBackgroundColor

      const color: string = this.danger
        ? store.getters.ThemeModule.getForegroundColorError1
        : this.success
          ? store.getters.ThemeModule.getForegroundColorSuccess1
          : store.getters.ThemeModule.getForegroundColor

      return {
        backgroundColor,
        color,
      }
    }
  }
</script>

<style scoped>
  .nia-button {
    box-sizing: border-box;
    display: inline-block;

    margin: 0;
    padding: .375em .75em;

    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    line-height: 1.5;
    text-transform: none;

    border: 1px solid transparent;
    border-radius: .25rem;

    cursor: pointer;
    overflow: hidden;
    user-select: none;

    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }
</style>
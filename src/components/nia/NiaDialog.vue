<template>
  <transition name="nia-dialog">
    <div
      class="nia-dialog-mask"
    >
      <div
        class="nia-dialog-wrapper">
        <div class="nia-dialog-container"
             :style="niaDialogContainerStyle">
          <h4 class="nia-dialog-header"
              :style="niaDialogHeaderStyle" >
            <slot name="header">
            </slot>
          </h4>

          <div class="nia-dialog-body">
            <slot name="body">
            </slot>
          </div>

          <div class="nia-dialog-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaDialog',
  })
  export default class NiaDialog extends Vue {
    @Prop({default: 400})
    width!: number

    get niaDialogContainerStyle(): object {
      return {
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
        width: `${this.width}px`
      }
    }

    get niaDialogHeaderStyle(): object {
      return {
        color: store.getters.Theme.getForegroundColorAccent1,
      }
    }
  }
</script>

<style scoped>
  .nia-dialog-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .nia-dialog-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .nia-dialog-container {
    margin: 0px auto;
    padding: 20px 30px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .nia-dialog-header {
    margin-top: 0;
    text-align: center;
  }

  .nia-dialog-body {
    margin: 20px 0;
  }

  .nia-dialog-footer {
    display: flex;
  }

  .nia-dialog-footer > * {
    display: block !important;
    flex: 1;
  }

  .nia-dialog-enter {
    opacity: 0;
  }

  .nia-dialog-leave-active {
    opacity: 0;
  }

  .nia-dialog-enter .nia-dialog-container,
  .nia-dialog-leave-active .nia-dialog-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
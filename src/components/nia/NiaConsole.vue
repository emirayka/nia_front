<template>
  <NiaScrollBar
    class="nia-console-wrapper"
    :auto-scroll="true"
    :style="style"
  >
    <NiaConsoleItem
      class="nia-console-item"
      v-for="(logItem, index) of log"
      :key="index"
      :log-item="logItem"
    />
  </NiaScrollBar>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import NiaConsoleItem from './NiaConsoleItem.vue'
  import {ExecutionResult} from '@/store/models'

  import store from '@/store'

  @Component({
    name: "NiaConsole",
    components: {
      NiaConsoleItem,
    },
  })
  export default class NiaConsole extends Vue {
    @Prop({ required: true })
    log!: Array<ExecutionResult>

    get style(): object {
      return {
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
      }
    }
  }
</script>

<style scoped>
  .nia-console-wrapper {
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: 20px;
  }
</style>
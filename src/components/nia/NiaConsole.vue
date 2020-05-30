<template>
  <NiaScrollBar class="nia-console">
    <NiaConsoleItem
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

  @Component({
    name: "NiaConsole",
    components: {
      NiaConsoleItem,
    },
  })
  export default class NiaConsole extends Vue {
    @Prop({ required: true })
    log!: Array<ExecutionResult>
  }
</script>

<style scoped>
  .nia-console {
    background-color: #222222;
  }
</style>
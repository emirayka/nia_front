<template>
  <NiaScrollBar class="nia-terminal-wrapper">
    <NiaBasicTerminal
      class="nia-terminal"
      :commands="commands"
    >
    </NiaBasicTerminal>
  </NiaScrollBar>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'
  import {ExecutionResult} from '@/store/models'
  import {Watch} from 'vue-property-decorator'

  import commands from './commands'

  @Component({
    name: 'NiaTerminal',
  })
  export default class NiaTerminal extends Vue {
    get commands(): object {
      return commands
    }
  }
</script>

<style scoped>
  .nia-terminal-wrapper {
    box-sizing: border-box;
  }

  .nia-terminal {
    height: 960px;
    margin: 20px;
  }
</style>
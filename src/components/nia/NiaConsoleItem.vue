<template>
  <div
    class="nia-console-item"
  >
    <div class="nia-console-item__code">
      <pre>>> {{ code }}</pre>
    </div>
    <div
      class="nia-console-item__result"
      :class="classObject"
    >
      {{ result }}
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import {ExecutionResult} from '@/store/models'

  @Component({
    name: 'NiaConsoleItem',
  })
  export default class NiaConsoleItem extends Vue {
    @Prop({ required: true })
    logItem!: ExecutionResult

    get classObject(): object {
      return {
        success: this.logItem.success,
        error: this.logItem.error,
        failure: this.logItem.failure,
      }
    }

    get result(): string {
      return this.logItem.result
    }

    get code(): string {
      return this.logItem.code
    }
  }
</script>

<style scoped>
  .nia-console-item {
    width: 100%;
    margin: 0;
    padding: 0;

    font-family: Consolas, Arial, monospace;
    font-size: 1.1em;
  }

  .nia-console-item__code {
    font-style: italic;
  }

  .nia-console-item__result {
    padding: 0 0 0 1.5em;
  }

  .nia-console-item__result.success {
    color: green;
    font-weight: bold;
  }

  .nia-console-item__result.error {
    color: red;
    font-weight: bold;
  }

  .nia-console-item__result.failure {
    font-weight: bold;
  }
</style>
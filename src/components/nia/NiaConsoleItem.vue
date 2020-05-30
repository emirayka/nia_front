<template>
  <div
    class="nia-console-item"
    :class="classObject"
  >
    {{ message }}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import {ExecutionResult} from '@/store/models'

  @Component({
    name: "NiaConsoleItem",
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

    get message(): string {
      return this.logItem.message
    }
  }
</script>

<style scoped>
  .nia-console-item {
    width: 100%;
    margin: 0;
    padding: 0 0 0 1em;
  }

  .nia-console-item.success {
    background-color: #333333;
    color: green;
    font-weight: bold;
  }

  .nia-console-item.error {
    background-color: #333333;
    color: black;
    font-weight: bold;
  }

  .nia-console-item.failure {
    background-color: #333333;
    font-weight: bold;
  }
</style>
<template>
  <div
    class="nia-grid-layout"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: "NiaTab",
  })
  export default class NiaTab extends Vue {
    @Prop({ default: 10 })
    columnNumber!: number

    @Prop({ default: 10 })
    rowNumber!: number

    @Prop({ default: () => ([10, 10]) })
    margin!: [number, number]

    get style(): object {
      const gridTemplateColumns: string = Array.from({ length: this.columnNumber })
        .map(x => '1fr')
        .join(' ');

      const gridTemplateRows: string = Array.from({ length: this.rowNumber })
        .map(x => '1fr')
        .join(' ');

      return {
        gridTemplateRows,
        gridTemplateColumns,
      }
    }
  }
</script>

<style scoped>
  .nia-grid-layout {
    display: grid;
    justify-content: stretch;
  }
</style>

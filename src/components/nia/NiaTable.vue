<template>
  <table class="nia-table">
    <NiaTableHeaderRow>
      <NiaTableRowItem
        v-for="(column, index) in columns"
        :key="index"
      >
        {{ column.name }}
      </NiaTableRowItem>

    </NiaTableHeaderRow>

    <tbody class="nia-table__tbody">
    <slot></slot>
    </tbody>
  </table>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import {NiaTableColumnDefinition} from '@/components/nia/lib'
  import NiaTableHeaderRow from './NiaTableHeaderRow.vue'
  import NiaTableRowItem from './NiaTableRowItem.vue'

  @Component({
    name: 'NiaTable',
    components: {
      NiaTableHeaderRow,
      NiaTableRowItem,
    },
  })
  export default class extends Vue {
    @Prop({ required: true })
    columns!: Array<NiaTableColumnDefinition>

    style(column: NiaTableColumnDefinition): object {
      const providedStyle: object = column.style ?? {}
      const width: string = column.width

      return {
        ...providedStyle,
        width: `${column.width}%`,
      }
    }
  }
</script>

<style scoped>
  .nia-table {
    cursor: default;
    width: 100%;
    line-height: 1.15;
    font-family: Montserrat, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    border-radius: .4em;
    overflow: hidden;
  }

  .nia-table__tbody {
    width: 100%;
    line-height: 1.15;
    font-family: Montserrat, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    color: #fff;
  }
</style>
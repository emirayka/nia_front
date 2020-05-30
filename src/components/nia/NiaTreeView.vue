<template>
  <NiaContainer class="nia-tree-view-container">
    <ul class="nia-tree-view">
      <NiaTreeViewItem
        :item="item"
        :selectedItems="selectedItems"
        :level="0"
        @click="$emit('click', $event)"
        @control-click="$emit('control-click', $event)"
        @double-click="$emit('double-click', $event)"
        @show-item-context-menu="$emit('show-item-context-menu', $event)"
      />
    </ul>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import {NiaTreeViewObject} from '@/components/nia/lib'

  import NiaTreeViewItem from './NiaTreeViewItem.vue'

  @Component({
    name: 'NiaTreeView',
    components: {
      NiaTreeViewItem,
    },
  })
  export default class NiaTreeView extends Vue {
    @Prop({ required: true })
    item!: NiaTreeViewObject

    @Prop({ required: true })
    selectedItems!: Array<string>
  }
</script>

<style scoped>
  .nia-tree-view-container {
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    height: 950px;
  }

  .nia-tree-view {
    list-style: none;
    padding: 0px;
  }
</style>

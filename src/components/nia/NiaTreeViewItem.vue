<template>
  <li
    class="nia-tree-view-item"
  >
    <div
      class="nia-tree-view-item__content"
      :class="{bold: isFolder}"
      :style="style"
      @click="clickHandler($event)"
      @contextmenu.prevent.stop="contextMenuHandler($event)"
      @mouseover.stop="hover = true"
      @mouseleave.stop="hover = false"
    >
      <pre>{{ spaces }} </pre>
      <fa-icon v-if="isFolder && isOpen" :icon="['fas', 'folder-open']"/>
      <fa-icon v-else-if="isFolder" :icon="['fas', 'folder']"/>
      <pre> {{ itemName }}</pre>
    </div>
    <ul
      class="nia-tree-view-item__list"
      v-show="isOpen"
      v-if="isFolder"
    >
      <NiaTreeViewItem
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        :selected-items="selectedItems"
        :level="level + 1"
        @click="$emit('click', $event)"
        @show-item-context-menu="$emit('show-item-context-menu', $event)"
        @control-click="$emit('control-click', $event)"
        @double-click="$emit('double-click', $event)"
      />
    </ul>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import {NiaTreeViewObject} from '@/components/nia/lib'

  export interface NiaTreeViewItemContextMenuEvent {
    item: NiaTreeViewObject;
    pageX: number;
    pageY: number;
  }

  @Component({
    name: "NiaTreeViewItem",
  })
  export default class NiaTreeViewItem extends Vue {
    hover = false
    isOpen = false

    clicks = 0
    control = false
    timer: ReturnType<typeof setTimeout> | null = null

    @Prop({ required: true })
    item!: NiaTreeViewObject

    @Prop({ required: true })
    selectedItems!: Array<string>

    @Prop({ required: true })
    level!: number

    get spaces(): string {
      return `${' '.repeat(this.level * 2)}`
    }

    get itemName(): string {
      return `${this.item?.name}`
    }

    get isFolder(): boolean {
      return this.item?.isDirectory ?? false
    }

    get style(): object {
      const style: object = {}

      if (this.selectedItems.includes(this.item?.fullPath)) {
        // @ts-ignore
        style.backgroundColor = '#555'
      } else if (this.hover) {
        // @ts-ignore
        style.backgroundColor = '#333'
      }

      if (this.item?.isDirectory) {
        // @ts-ignore
        style.color = 'gold'
      } else if (this.item?.name.endsWith('.nia')) {
        // @ts-ignore
        style.color = 'purple'
      } else if (this.item?.name.endsWith('nl')) {
        // @ts-ignore
        style.color = 'ligthtskyblue'
      } else {
        // @ts-ignore
        style.color = 'white'
      }

      return style
    }

    clickHandler(event: MouseEvent): void {
      this.clicks += 1

      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          if (event.ctrlKey) {
            this.onControlClickHandler()
          } else {
            this.onClickHandler()
          }
          this.clicks = 0
        }, 200);
      } else {
        if (this.timer !== null) {
          clearTimeout(this.timer)
        }
        this.onDoubleClickHandler()
        this.clicks = 0;
      }
    }

    contextMenuHandler(mouseEvent: MouseEvent) {
      const event: NiaTreeViewItemContextMenuEvent = {
        item: this.item,
        pageX: mouseEvent.pageX,
        pageY: mouseEvent.pageY,
      }

      this.$emit('show-item-context-menu', event)
    }

    onDoubleClickHandler(): void {
      if (this.item.isDirectory) {
        this.isOpen = !this.isOpen
      }
      this.$emit('double-click', this.item)
    }

    onClickHandler(): void {
      this.$emit('click', this.item)
    }

    onControlClickHandler(): void {
      this.$emit('control-click', this.item)
    }
  }
</script>

<style scoped>
  .nia-tree-view-item {
    cursor: default;
  }

  .nia-tree-view-item__list {
    list-style: none;
    padding: 0px;
  }

  .nia-tree-view-item__content {
    font-family: 'Helvetica', 'Arial', sans-serif;
    font-size: 1.25em;
    padding: 5px;
    user-select: none;
  }

  pre {
    display: inline;
  }
</style>
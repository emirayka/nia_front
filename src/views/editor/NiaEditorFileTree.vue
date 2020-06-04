<template>
  <NiaContainer>
    <NiaScrollBar>
      <NiaTreeView :item="item"
                   :selected-items="selectedItems"
                   @click="clickHandler($event)"
                   @double-click="doubleClickHandler($event)"
                   @control-click="controlClickHandler($event)"
                   @show-item-context-menu="showItemContextMenuHandler($event)"
      />
    </NiaScrollBar>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'

  import {NiaTreeViewObject} from '@/components/nia/lib'
  import Component from 'vue-class-component'
  import store from '@/store'
  import {NiaTreeViewItemContextMenuEvent} from '@/components/nia/NiaTreeViewItem.vue'
  import {TreePart} from '@/utils'
  import {NiaFile} from '@/store/modules/file'

  @Component({
    name: "editor-file-tree",
  })
  export default class NiaEditorFileTree extends Vue {
    get item(): NiaTreeViewObject {
      return store.getters.File.configTree as NiaTreeViewObject
    }

    get selectedItems(): Array<string> {
      return store.getters.UI.EditorFileTree.selectedItems
    }

    doubleClickHandler(item: NiaTreeViewObject): void {
      if (item.isDirectory) {
        return
      }

      if (store.getters.File.isFileOpened(item.fullPath)) {
        const file: NiaFile | null = store.getters.File.getFileByPath(item.fullPath)

        if (file !== null) {
          store.commit.UI.OpenedFiles.setOpenedFile(file)
        }
      } else {
        store.dispatch.FileConnection.openFile(item.fullPath)
      }
      store.commit.UI.EditorFileTree.selectItem(item)
    }

    clickHandler(item: NiaTreeViewObject): void {
      store.commit.UI.EditorFileTree.selectItem(item)
    }

    controlClickHandler(item: NiaTreeViewObject): void {
      store.commit.UI.EditorFileTree.toggleItemSelection(item)
    }

    showItemContextMenuHandler(event: NiaTreeViewItemContextMenuEvent): void {
      if (!store.getters.UI.EditorFileTree.isSelected(event.item)) {
        store.commit.UI.EditorFileTree.selectItem(event.item)
      }

      store.commit.Context.EditorFileTree.setItem(event.item as TreePart)
      store.commit.Context.EditorFileTree.setX(event.pageX)
      store.commit.Context.EditorFileTree.setY(event.pageY)
      store.commit.Context.EditorFileTree.show()
    }
  }
</script>

<style scoped>
  .ps {
    height: 950px;
  }
</style>
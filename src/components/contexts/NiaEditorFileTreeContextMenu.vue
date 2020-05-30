<template>
  <NiaContextMenu
    :items="items"
    :shown="shown"
    :x="x"
    :y="y"
    @hide="hideHandler()"
    @click="clickHandler($event)"
  />
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import fs from 'fs'
  import path from 'path'

  import store from '@/store'
  import {NiaContextMenuItemData} from '@/components/nia/lib'
  import {NiaNamedAction, TreePart} from '@/utils'

  const ITEM_NEW_FILE = 'New file'
  const ITEM_NEW_DIRECTORY = 'New directory'
  const ITEM_DELETE = 'Delete'

  @Component({
    name: 'ActionContextMenu',
  })
  export default class ActionContextMenu extends Vue {
    // means parent directory if path is file, otherwise directory itself
    getTargetPath(): string {
      const item: TreePart | null = store.getters.Context.EditorFileTree.item

      if (item === null) {
        return ''
      }

      const p: string = item.fullPath
      const stat = fs.lstatSync(p)

      if (stat.isDirectory()) {
        return p
      } else {
        return path.dirname(p)
      }
    }

    newFileHandler() {
      store.commit.UI.NewFileDialog.setParentDirectoryPath(this.getTargetPath())
      store.commit.UI.NewFileDialog.show()
    }

    newDirectoryHandler() {
      store.commit.UI.NewDirectoryDialog.setParentDirectoryPath(this.getTargetPath())
      store.commit.UI.NewDirectoryDialog.show()
    }

    deleteHandler() {
      const selected: Array<string> = store.getters.UI.EditorFileTree.selectedItems

      store.dispatch.FileConnection.delete(selected)
    }

    clickHandler(name: string): void {
      switch (name) {
        case ITEM_NEW_FILE:
          this.newFileHandler()
          break

        case ITEM_NEW_DIRECTORY:
          this.newDirectoryHandler()
          break

        case ITEM_DELETE:
          this.deleteHandler()
          break
      }

      store.commit.Context.EditorFileTree.hide()
    }

    hideHandler(): void {
      store.commit.Context.EditorFileTree.hide()
    }

    // getters

    get items(): Array<NiaContextMenuItemData> {
      const items: Array<NiaContextMenuItemData> = []

      const selectedActions: Array<NiaNamedAction> = store.getters.UI.ActionTable.selectedActions
      const clickedAction: NiaNamedAction | null = store.getters.Context.Action.action

      items.push({
        name: ITEM_NEW_FILE,
        text: ITEM_NEW_FILE,
      })

      items.push({
        name: ITEM_NEW_DIRECTORY,
        text: ITEM_NEW_DIRECTORY,
      })

      items.push({
        name: ITEM_DELETE,
        text: ITEM_DELETE,
      })

      return items
    }

    get shown(): boolean {
      return store.getters.Context.EditorFileTree.shown
    }

    get x(): number {
      return store.getters.Context.EditorFileTree.x
    }

    get y(): number {
      return store.getters.Context.EditorFileTree.y
    }
  }
</script>

<style scoped>

</style>

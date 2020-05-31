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

  import store from '@/store'
  import {NiaContextMenuItemData} from '@/components/nia/lib'
  import {NiaFile} from '../../store/modules/file'

  const ITEM_CLOSE_FILE = 'Close file'

  @Component({
    name: 'NiaOpenedFileContextMenu',
  })
  export default class NiaOpenedFileContextMenu extends Vue {
    closeFileHandler() {
      const file: NiaFile | null = store.getters.Context.OpenedFile.file

      if (file === null) {
        return
      }

      store.dispatch.FileConnection.saveFile(file)
      store.commit.File.closePath(file.fullPath)

      const firstFile: NiaFile | undefined = Object.values(store.getters.File.openedFiles)[0]

      if (firstFile) {
        store.commit.UI.OpenedFiles.setOpenedFile(firstFile)
      }
    }

    clickHandler(name: string): void {
      switch (name) {
        case ITEM_CLOSE_FILE:
          this.closeFileHandler()
          break
      }

      store.commit.Context.OpenedFile.hide()
    }

    hideHandler(): void {
      store.commit.Context.OpenedFile.hide()
    }

    // getters

    get items(): Array<NiaContextMenuItemData> {
      const items: Array<NiaContextMenuItemData> = []

      items.push({
        name: ITEM_CLOSE_FILE,
        text: ITEM_CLOSE_FILE,
      })

      return items
    }

    get shown(): boolean {
      return store.getters.Context.OpenedFile.shown
    }

    get x(): number {
      return store.getters.Context.OpenedFile.x
    }

    get y(): number {
      return store.getters.Context.OpenedFile.y
    }
  }
</script>

<style scoped>

</style>

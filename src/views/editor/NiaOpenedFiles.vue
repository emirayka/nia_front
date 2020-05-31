<template>
  <NiaContainer class="nia-opened-files">
    <NiaTabs
      :selected-tab-index="selectedTabIndex"
      @tab-selected="tabSelectedHandler($event)"
      @contextmenu="contextMenuHandler($event)"
    >
      <NiaTab
        v-for="(openedFile, index) in openedFiles"
        :title="openedFile.name"
        :key="index"
      >
        <NiaContainer class="nia-opened-files__tab__code-editor-wrapper">
          <NiaCodeEditor
            class="nia-opened-files__tab__code-editor"
            :enabled="true"
            :code="openedFile.fileContent"
            @change="setFileContent(openedFile.fullPath, $event)"
            @execute="executeHandler($event)"
          >
          </NiaCodeEditor>
        </NiaContainer>
      </NiaTab>
    </NiaTabs>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import {NiaFile} from '../../store/modules/file'

  import store from '@/store'
  import {NiaTabContextMenuEvent} from '@/components/nia/NiaTabs.vue'

  @Component({
    name: 'NiaOpenedFiles',
  })
  export default class NiaOpenedFiles extends Vue {
    get openedFiles(): Array<NiaFile> {
      return Object.values(store.getters.File.openedFiles)
    }

    get selectedTabIndex(): number {
      let index = 0
      const selectedFile: NiaFile | null = store.getters.UI.OpenedFiles.openedFile

      for (const openedFile of this.openedFiles) {
        if (openedFile.fullPath === selectedFile?.fullPath) {
          break
        }

        index += 1
      }

      return index
    }

    tabSelectedHandler(index: number): void {
      const selectedFile: NiaFile | null = this.openedFiles[index] ?? null

      store.commit.UI.OpenedFiles.setOpenedFile(selectedFile)
    }

    contextMenuHandler(event: NiaTabContextMenuEvent): void {
      const index: number = event.index
      const file: NiaFile = this.openedFiles[index]

      store.commit.Context.OpenedFile.setX(event.pageX)
      store.commit.Context.OpenedFile.setY(event.pageY)
      store.commit.Context.OpenedFile.setFile(file)
      store.commit.Context.OpenedFile.show()
    }

    setFileContent(fullPath: string, newContent: string): void {
      store.commit.File.setFileContent({
        fullPath,
        newContent,
      })
    }

    executeHandler(code: string): void {
      store.dispatch.Connection.executeCode({
        code
      })
    }
  }
</script>

<style scoped>
  .nia-opened-files {
    height: 640px;
  }

  .nia-opened-files__tab__code-editor-wrapper {
    height: 600px;
  }
</style>
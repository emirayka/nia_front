<template>
  <NiaContainer class="nia-opened-files">
    <NiaTabs
      :selected-tab-index="selectedTabIndex"
      @tab-selected="selectedTabIndex = $event"
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
    selectedTabIndex = 0

    get openedFiles(): Array<NiaFile> {
      return Object.values(store.getters.File.openedFiles)
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
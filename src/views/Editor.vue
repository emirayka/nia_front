<template>
  <div class="nia-editor">
    <NiaToolbar>
      <NiaToolbarItem style="visibility: hidden">
        1
      </NiaToolbarItem>
<!--      <NiaToolbarItem>-->
<!--        2-->
<!--      </NiaToolbarItem>-->
    </NiaToolbar>

    <NiaGridLayout
      class="nia-editor__grid_layout"
      :column-number="100"
      :row-number="100"
      :margin="[10, 10]"
    >
      <NiaGridItem
        :x="1"
        :y="1"
        :w="20"
        :h="100"
      >
        <NiaEditorFileTree />
      </NiaGridItem>

      <NiaGridItem
        :x="21"
        :y="1"
        :w="80"
        :h="70"
      >
        <NiaOpenedFiles />
      </NiaGridItem>

      <NiaGridItem
        :x="21"
        :y="71"
        :w="80"
        :h="30"
      >
        <NiaConsole
          class="nia-editor__nia-console"
          :log="log"
        />
      </NiaGridItem>
    </NiaGridLayout>

    <NiaEditorFileTreeContextMenu />
    <NiaOpenedFileContextMenu />
    <NiaNewFileDialog v-if="newFileDialogIsShown" />
    <NiaNewDirectoryDialog v-if="newDirectoryDialogIsShown" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'
  import {
    ExecutionResult,
  } from '@/store/models'

  import NiaEditorFileTree from './editor/NiaEditorFileTree.vue'
  import NiaOpenedFiles from './editor/NiaOpenedFiles.vue'
  import NiaNewFileDialog from '@/components/dialogs/NiaNewFileDialog.vue'
  import NiaNewDirectoryDialog from '@/components/dialogs/NiaNewDirectoryDialog.vue'

  import NiaEditorFileTreeContextMenu from '@/components/contexts/NiaEditorFileTreeContextMenu.vue'
  import NiaOpenedFileContextMenu from '@/components/contexts/NiaOpenedFileContextMenu.vue'

  @Component({
    name: "Editor",
    components: {
      NiaEditorFileTree,
      NiaOpenedFiles,
      NiaEditorFileTreeContextMenu,
      NiaOpenedFileContextMenu,
      NiaNewFileDialog,
      NiaNewDirectoryDialog,
    },
  })
  export default class Editor extends Vue {
    get log(): Array<ExecutionResult> {
      return store.getters.Editor.executionLog
    }

    get code(): string {
      return store.getters.Editor.code
    }

    get newFileDialogIsShown(): boolean {
      return store.getters.UI.NewFileDialog.isShown
    }

    get newDirectoryDialogIsShown(): boolean {
      return store.getters.UI.NewDirectoryDialog.isShown
    }

    changeHandler(code: string): void {
      store.commit.Editor.setCode(code)
    }

    executeHandler(code: string): void {
      store.dispatch.Connection.executeCode({
        code,
      })
    }

    mounted() {
      store.dispatch.FileConnection.listConfigDirectory()
    }
  }
</script>

<style
  scoped
  lang="scss"
>

  .nia-editor {
    height: 1023px;
  }

  .nia-editor__content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .nia-editor__grid_layout {
    box-sizing: border-box;
    height: 985px;
  }

  .nia-editor__grid_layout__nia-code-editor {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .nia-editor__nia-console {
    width: 100%;
    height: 255px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
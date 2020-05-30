import path from "path"
<template>
  <NiaDialog>
    <template v-slot:header>
      New file
    </template>

    <template v-slot:body>
      <NiaInputText :enabled="true"
                    :multiline="false"
                    :value="fileName"
                    @change="changeHandler"
      />
    </template>

    <template v-slot:footer>
      <NiaDialogFooterButton @click="makeNewFileHandler()">
        Make new file
      </NiaDialogFooterButton>

      <NiaDialogFooterButton @click="cancelHandler()">
        Cancel
      </NiaDialogFooterButton>
    </template>
  </NiaDialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import path from 'path'

  import store from '@/store'

  import loggers from '@/utils/logger'
  const logger = loggers('NewFileDialog')

  @Component({
    name: 'NiaNewFileDialog',
  })
  export default class NiaNewFileDialog extends Vue {
    get fileName(): string {
      return store.getters.UI.NewFileDialog.fileName
    }
    
    cancelHandler(): void {
      store.commit.UI.NewFileDialog.hide()
    }

    makeNewFileHandler(): void {
      const parentDirectory: string = store.getters.UI.NewFileDialog.parentDirectoryPath
      const fileName: string = store.getters.UI.NewFileDialog.fileName

      store.dispatch.FileConnection.newFile(path.join(parentDirectory, fileName))
    }

    changeHandler(newFileName: string): void {
      store.commit.UI.NewFileDialog.setFileName(newFileName)
    }
  }
</script>

<style scoped>

</style>

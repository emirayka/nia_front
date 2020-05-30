<template>
  <NiaDialog>
    <template v-slot:header>
      New directory
    </template>

    <template v-slot:body>
      <NiaInputText :enabled="true"
                    :multiline="false"
                    :value="directoryName"
                    @change="changeHandler"
      />
    </template>

    <template v-slot:footer>
      <NiaDialogFooterButton @click="makeNewDirectoryHandler()">
        Make new directory
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
  const logger = loggers('AddActionDialog')

  @Component({
    name: 'NiaAddActionDialog',
  })
  export default class NiaAddActionDialog extends Vue {
    get directoryName(): string {
      return store.getters.UI.NewDirectoryDialog.directoryName
    }

    cancelHandler(): void {
      store.commit.UI.NewDirectoryDialog.hide()
    }

    makeNewDirectoryHandler(): void {
      const parentDirectory: string = store.getters.UI.NewDirectoryDialog.parentDirectoryPath
      const directoryName: string = store.getters.UI.NewDirectoryDialog.directoryName

      store.dispatch.FileConnection.newDirectory(path.join(parentDirectory, directoryName))
    }

    changeHandler(newDirectoryName: string): void {
      store.commit.UI.NewDirectoryDialog.setDirectoryName(newDirectoryName)
    }
  }
</script>

<style scoped>

</style>

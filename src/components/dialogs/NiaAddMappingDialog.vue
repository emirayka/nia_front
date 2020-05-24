<template>
  <NiaDialog>
    <template v-slot:header>
      Add mapping
    </template>

    <template v-slot:body>
      <NiaInputText
        :value="s"
        :enabled="true"
        @input="changeHandler($event)"
      >
      </NiaInputText>

      <NiaLabel
        v-if="!valid"
        label="Key chord sequence is not valid"
      >
      </NiaLabel>
    </template>

    <template v-slot:footer>
      <NiaDialogFooterButton @click="addMappingHandler()">
        Add
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

  import store from '@/store'

  import {
    NiaFormEditEvent,
    NiaFormEditProperty,
    NiaFormEvent,
    NiaFormProperty,
    NiaFormPropertyEvent,
    NiaFormPropertyType, NiaFormSelectEvent, NiaFormSelectProperty,
  } from '@/components/nia/lib'
  import {
    mapKeyCodeToString,
    mapStringToKeyCode,
    NiaAction, NiaActionTextType,
    NiaDefineMappingEvent,
    NiaDeviceInfo,
    NiaKeyChord, NiaMapping,
  } from '@/utils'

  @Component({
    name: 'NiaAddMappingDialog',
  })
  export default class NiaAddMappingDialog extends Vue {
    s = ''

    get valid(): boolean {
      return store.getters.UI.AddMappingDialog.valid
    }

    changeHandler(event: string): void {
      store.commit.UI.AddMappingDialog.setKeyChordsWithString(event)
      this.s = event
    }

    addMappingHandler(): void {
      if (!store.getters.UI.AddMappingDialog.valid) {
        return
      }

      const keyChords: Array<NiaKeyChord> = store.getters.UI.AddMappingDialog.selectedKeyChords
      const emptyAction: NiaActionTextType = new NiaActionTextType({
        text: ''
      })
      const action: NiaAction = emptyAction.toAction()

      const mapping: NiaMapping = new NiaMapping({
        keyChords,
        action
      })

      store.dispatch.Connection.defineMapping({
        mapping
      })

      store.commit.UI.AddMappingDialog.hide()
    }

    cancelHandler(): void {
      store.commit.UI.AddMappingDialog.hide()
    }

    selectDeviceHandler(): void {
    }

    selectKeyCodeHandler(): void {
    }

    selectMappingAliasHandler(): void {
    }
  }
</script>

<style scoped>

</style>

<template>
  <NiaDialog>
    <template v-slot:header>
      Add modifier
    </template>

    <template v-slot:body>
      <NiaForm
        :form-properties="constructFormProperties()"
        :property-name-percents="30"
        @change="changeHandler($event)"
      />
    </template>

    <template v-slot:footer>
      <NiaDialogFooterButton @click="addModifierHandler()">
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
  import {DeviceInfo, KeyDescription} from '@/store/models'
  import {mapKeyCodeToString} from '@/utils'

  const PROPERTY_KEYBOARD = 'Keyboard'
  const PROPERTY_KEY = 'Key'
  const PROPERTY_MODIFIER_ALIAS = 'Modifier alias'

  @Component({
    name: 'NiaAddModifierDialog',
  })
  export default class NiaAddModifierDialog extends Vue {
    constructFormProperties() {
      const selectedKeyboardName = store.getters.UIModule.addModifierDialogSelectedKeyboard
      const keyboardNames: Array<string> = store.getters.KeymappingModule.keyboardNames
      let keys: Array<string> = [];

      if (selectedKeyboardName !== null) {
        const selectedKeyboard: DeviceInfo | null = store.getters.KeymappingModule.getKeyboardByName(selectedKeyboardName)
        if (selectedKeyboard !== null) {
          keys = selectedKeyboard
            .model
            .keys
            .map((key) => mapKeyCodeToString(key.code))
        }
      }

      return [
        {
          type: NiaFormPropertyType.Select,
          name: PROPERTY_KEYBOARD,
          validator: (value: NiaFormEvent) => true,
          selectValues: keyboardNames,
        } as NiaFormSelectProperty,
        {
          type: NiaFormPropertyType.Select,
          name: PROPERTY_KEY,
          validator: (value: NiaFormEvent) => true,
          selectValues: keys,
        } as NiaFormSelectProperty,
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_MODIFIER_ALIAS,
          validator: (value: NiaFormEvent) => true,
        } as NiaFormEditProperty,
      ]
    }

    addModifierHandler(): void {
      this.$emit('add-modifier')
    }

    cancelHandler(): void {
      this.$emit('cancel')
    }

    changeHandler(event: NiaFormPropertyEvent): void {
      switch (event.propertyName) {
        case PROPERTY_KEYBOARD:
          this.$emit('select-keyboard', (event.selectEvent as NiaFormSelectEvent).value)
          break;
        case PROPERTY_KEY:
          this.$emit('select-key-code', (event.selectEvent as NiaFormSelectEvent).value)
          break;
        case PROPERTY_MODIFIER_ALIAS:
          this.$emit('select-modifier-alias', (event.editEvent as NiaFormEditEvent).value)
          break;
      }
    }
  }
</script>

<style scoped>

</style>
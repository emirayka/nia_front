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
      <NiaDialogFooterButton @click="$emit('add-modifier')">
        Add
      </NiaDialogFooterButton>

      <NiaDialogFooterButton @click="$emit('cancel')">
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
  import {mapKeyCodeToString, NiaDeviceInfo} from '@/utils'

  const PROPERTY_KEYBOARD = 'Keyboard'
  const PROPERTY_KEY = 'Key'
  const PROPERTY_MODIFIER_ALIAS = 'Modifier alias'

  @Component({
    name: 'NiaAddModifierDialog',
  })
  export default class NiaAddModifierDialog extends Vue {
    constructFormProperties() {
      const selectedKeyboardName = store.getters.UIModule.addModifierDialogSelectedKeyboard
      const deviceNames: Array<string> = store.getters.KeymappingModule.deviceNames
      let keys: Array<string> = [];

      if (selectedKeyboardName !== null) {
        const selectedDevice: NiaDeviceInfo | null = store.getters.KeymappingModule.getDeviceByName(selectedKeyboardName)

        if (selectedDevice !== null) {
          keys = selectedDevice
            .getDeviceModel()
            .getKeyDescriptions()
            .map((key) => mapKeyCodeToString(key.getKeyCode()))
        }
      }

      return [
        {
          type: NiaFormPropertyType.Select,
          name: PROPERTY_KEYBOARD,
          validator: () => true,
          selectValues: deviceNames,
        } as NiaFormSelectProperty,
        {
          type: NiaFormPropertyType.Select,
          name: PROPERTY_KEY,
          validator: () => true,
          selectValues: keys,
        } as NiaFormSelectProperty,
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_MODIFIER_ALIAS,
          validator: () => true,
        } as NiaFormEditProperty,
      ]
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
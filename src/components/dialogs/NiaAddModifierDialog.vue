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
  import {
    mapKeyCodeToString,
    mapStringToKeyCode,
    NiaDefineModifierEvent,
    NiaDeviceInfo, NiaKey,
    NiaModifierDescription,
  } from '@/utils'

  const PROPERTY_DEVICE = 'Device'
  const PROPERTY_KEY = 'Key'
  const PROPERTY_MODIFIER_ALIAS = 'Modifier alias'

  @Component({
    name: 'NiaAddModifierDialog',
  })
  export default class NiaAddModifierDialog extends Vue {
    constructFormProperties() {
      const selectedDeviceName = store.getters.UI.AddModifierDialog.selectedDevice
      const deviceNames: Array<string> = store.getters.Keymapping.DevicesInfo.deviceNames
      let keys: Array<string> = [];

      if (selectedDeviceName !== null) {
        const selectedDevice: NiaDeviceInfo | null = store.getters.Keymapping.DevicesInfo.getDeviceByName(selectedDeviceName)

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
          name: PROPERTY_DEVICE,
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
        case PROPERTY_DEVICE:
          this.selectDeviceHandler((event.selectEvent as NiaFormSelectEvent).value)
          break;
        case PROPERTY_KEY:
          this.selectKeyCodeHandler((event.selectEvent as NiaFormSelectEvent).value)
          break;
        case PROPERTY_MODIFIER_ALIAS:
          this.selectModifierAliasHandler((event.editEvent as NiaFormEditEvent).value)
          break;
      }
    }


    addModifierHandler(): void {
      const deviceName: string = store.getters.UI.AddModifierDialog.selectedDevice
      const device: NiaDeviceInfo | null = store.getters.Keymapping.DevicesInfo.getDeviceByName(deviceName)

      if (device === null) {
        // todo: show error here
        return
      }

      const deviceId: number = device.getDeviceId()
      const keyCode: number = store.getters.UI.AddModifierDialog.selectedKeyCode
      const modifierAlias: string = store.getters.UI.AddModifierDialog.selectedModifierAlias

      if (store.getters.Keymapping.Modifiers.isModifierAlreadyDefined(deviceId, keyCode)) {
        // todo: show error here
        return
      }

      const key: NiaKey = new NiaKey({
        deviceId: deviceId,
        keyCode: keyCode
      })

      store.dispatch.Connection.defineModifier({
        modifier: new NiaModifierDescription({
          key,
          alias: modifierAlias
        })
      })

      store.commit.UI.AddModifierDialog.hide()
    }

    cancelHandler(): void {
      store.commit.UI.AddModifierDialog.hide()
    }

    selectDeviceHandler(keyboardName: string): void {
      store.commit.UI.AddModifierDialog.setSelectedDeviceName(keyboardName)
    }

    selectKeyCodeHandler(keyCodeName: string): void {
      const keyCode: number = mapStringToKeyCode(keyCodeName)

      if (Number.isInteger(keyCode)) {
        store.commit.UI.AddModifierDialog.setSelectedKeyCode(keyCode)
      }
    }

    selectModifierAliasHandler(modifierAlias: string): void {
      store.commit.UI.AddModifierDialog.setSelectedModifierAlias(modifierAlias)
    }
  }
</script>

<style scoped>

</style>
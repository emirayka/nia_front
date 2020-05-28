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
  import {NiaDeviceInfo} from '../../utils/domain/device'

  const ITEM_ENABLE = 'Enable device'
  const ITEM_DISABLE = 'Disable device'

  @Component({
    name: 'DeviceContextMenu',
  })
  export default class DeviceContextMenu extends Vue {
    clickHandler(name: string): void {
      const device: NiaDeviceInfo | null = store.getters.Context.Device.deviceInfo

      if (device !== null) {
        switch (name) {
          case ITEM_ENABLE:
            store.dispatch.Connection.defineDevice({
              deviceId: device.getDeviceId()
            })
            break

          case ITEM_DISABLE:
            store.dispatch.Connection.removeDevice({
              devicePath: device.getDevicePath()
            })
            break
        }
      }

      store.commit.Context.Device.hide()
    }

    hideHandler(): void {
      store.commit.Context.Device.hide()
    }

    get items(): Array<NiaContextMenuItemData> {
      const items: Array<NiaContextMenuItemData> = []
      const device: NiaDeviceInfo | null = store.getters.Context.Device.deviceInfo

      if (device !== null) {
        if (device.isDefined()) {
          items.push({
            name: ITEM_DISABLE,
            text: ITEM_DISABLE,
          })
        } else {
          items.push({
            name: ITEM_ENABLE,
            text: ITEM_ENABLE,
          })
        }
      }

      return items
    }

    get shown(): boolean {
      return store.getters.Context.Device.shown
    }

    get x(): number {
      return store.getters.Context.Device.x
    }

    get y(): number {
      return store.getters.Context.Device.y
    }
  }
</script>

<style scoped>

</style>

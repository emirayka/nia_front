<template>
  <div
    class="nia-keyboards"
    ref="tabs"
  >
    <NiaTabs
      class="nia-keyboards__nia-tabs"
    >
      <NiaTab
        class="nia-keyboards__nia-tabs__nia-tab"
        v-for="(device, index) of devicesInfo"
        :key="index"
        :title="device.getDeviceName()"
      >
        <NiaKeyboard
          :model="device.getDeviceModel()"
          :defined="device.isDefined()"
          :keyboard-height="keyboardHeight"
          :keyboard-width="keyboardWidth"
          :selected-keys="getDeviceSelectedKeys(device.getDeviceId())"
          :modifiers="getDeviceModifiers(device.getDeviceId())"
          @switch="switchHandler(device, $event)"
          @click-key="clickKeyHandler(device, $event)"
          @click-keyboard="clickKeyboardHandler(device)"
        />
      </NiaTab>

      <NiaTab
        :title="'No devices'"
        v-if="noDevices"
      >
        <div>
          No devices were found
        </div>
      </NiaTab>
      <NiaTab
        :title="'No devices 2'"
        v-if="noDevices"
      >
        <div>
          No devices were found too
        </div>
      </NiaTab>
    </NiaTabs>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import NiaKeyboard from './nia-keyboards/NiaKeyboard.vue'

  import {
    NiaDefineDeviceEvent,
    NiaDefineDeviceEventObject,
    NiaDeviceInfo,
    NiaKey, NiaModifierDescription,
    NiaRemoveDeviceEvent,
    NiaRemoveDeviceEventObject,
  } from '@/utils'

  import store from '@/store'

  @Component({
    name: 'NiaKeyboards',
    components: {
      NiaKeyboard,
    },
  })
  export default class NiaKeyboards extends Vue {
    $refs!: {
      tabs: HTMLDivElement;
    }

    switchHandler(deviceInfo: NiaDeviceInfo, needToDefine: boolean): void {
      if (needToDefine) {
        const args: NiaDefineDeviceEventObject = {
          deviceId: deviceInfo.getDeviceId(),
        }

        store.dispatch.Connection.defineDevice(args)
      } else {
        const args: NiaRemoveDeviceEventObject = {
          devicePath: deviceInfo.getDevicePath(),
        }

        store.dispatch.Connection.removeDevice(args)
      }
    }

    clickKeyboardHandler(device: NiaDeviceInfo): void {
      store.commit.UI.General.unselectKeys()
    }

    clickKeyHandler(device: NiaDeviceInfo, keyCode: number): void {
      const key: NiaKey = new NiaKey({
        deviceId: device.getDeviceId(),
        keyCode: keyCode,
      })

      store.commit.UI.General.toggleKeySelection(key)
    }

    getDeviceModifiers(deviceId: number): Array<NiaModifierDescription> {
      return this.modifiers
        .filter((selectedModifier) => selectedModifier.getKey().getDeviceId() == deviceId)
    }

    getDeviceSelectedKeys(deviceId: number): Array<NiaKey> {
      return this.selectedKeys
        .filter((selectedKey) => selectedKey.getDeviceId() == deviceId)
    }

    get modifiers(): Array<NiaModifierDescription> {
      return store.getters.Keymapping.Modifiers.definedModifiers
    }

    get devicesInfo(): Array<NiaDeviceInfo> {
      return store.getters.Keymapping.DevicesInfo.devices
    }

    get selectedKeys(): Array<NiaKey> {
      return store.getters.UI.General.selectedKeys
    }

    get noDevices(): boolean {
      return this.devicesInfo.length === 0
    }

    get totalHeight(): number {
      return this.$refs.tabs.clientHeight
    }

    get totalWidth(): number {
      return this.$refs.tabs.clientWidth
    }

    get tabTitlesHeight(): number {
      return 42 // kek
    }

    get switchButtonHeight(): number {
      return 30
    }

    get availableHeight(): number {
      return this.totalHeight - this.tabTitlesHeight - this.switchButtonHeight
    }

    get keyboardHeight(): number {
      return this.availableHeight
    }

    get keyboardWidth(): number {
      return this.totalWidth
    }
  }
</script>

<style scoped>
  .nia-keyboards {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .nia-keyboards__nia-tabs {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .nia-keyboards__nia-tabs__nia-tab {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }


</style>
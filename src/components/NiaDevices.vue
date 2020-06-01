<template>
  <NiaContainer class="nia-devices-container">
    <div
      class="nia-devices"
      ref="tabs"
    >
      <NiaTabs
        class="nia-devices__nia-tabs"
        :selected-tab-index="selectedDeviceTabIndex"
        @tab-selected="selectedDeviceTabIndex = $event"
        @contextmenu="tabContextMenuHandler($event)"
      >
        <NiaTab
          class="nia-devices__nia-tabs__nia-tab"
          v-for="(device, index) of devicesInfo"
          :key="index"
          :title="`${device.getDeviceId()}:${device.getDeviceName()}`"
        >
          <NiaDevice
            :model="device.getDeviceModel()"
            :defined="device.isDefined()"
            :device-height="deviceHeight"
            :device-width="deviceWidth"
            :selected-keys="getDeviceSelectedKeys(device.getDeviceId())"
            :selected-mapping-keys="getDeviceSelectedMappingKeys(device.getDeviceId())"
            :modifiers="getDeviceModifiers(device.getDeviceId())"
            @select-key="selectKeyHandler(device, $event)"
            @toggle-key-selection="toggleKeySelectionHandler(device, $event)"
            @show-key-context-menu="showKeyContextMenuHandler(device, $event)"
            @show-device-context-menu="showDeviceContextMenuHandler(device, $event)"
            @clear-key-selection="clearKeySelectionHandler()"
          />
        </NiaTab>

        <NiaTab
          title="No devices"
          v-if="noDevices"
        >
          <div>
            No devices were found
          </div>
        </NiaTab>
      </NiaTabs>
    </div>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import NiaDevice from './nia-devices/NiaDevice.vue'

  import {
    NiaDeviceInfo,
    NiaKey, NiaKeyChord, NiaModifierDescription,
  } from '@/utils'

  import store from '@/store'
  import {
    NiaDeviceSelectEvent,
    NiaDeviceShowContextMenuEvent,
    NiaDeviceToggleSelectionEvent,
  } from '@/components/nia-devices/NiaDevice.vue'
  import {NiaTabContextMenuEvent} from '@/components/nia/NiaTabs.vue'

  @Component({
    name: 'NiaDevices',
    components: {
      NiaDevice,
    },
  })
  export default class NiaDevices extends Vue {
    selectedDeviceTabIndex = 0

    $refs!: {
      tabs: HTMLDivElement;
    }

    // handlers
    selectKeyHandler(deviceInfo: NiaDeviceInfo, event: NiaDeviceSelectEvent): void {
      const key: NiaKey = new NiaKey({
        deviceId: deviceInfo.getDeviceId(),
        keyCode: event.keyCode,
      })

      store.commit.UI.Devices.selectKey(key)
    }

    toggleKeySelectionHandler(deviceInfo: NiaDeviceInfo, event: NiaDeviceToggleSelectionEvent): void {
      const key: NiaKey = new NiaKey({
        deviceId: deviceInfo.getDeviceId(),
        keyCode: event.keyCode,
      })

      store.commit.UI.Devices.toggleKeySelection(key)
    }

    clearKeySelectionHandler(): void {
      store.commit.UI.Devices.unselectKeys()
    }

    showKeyContextMenuHandler(deviceInfo: NiaDeviceInfo, event: NiaDeviceShowContextMenuEvent): void {
      const key: NiaKey = new NiaKey({
        deviceId: deviceInfo.getDeviceId(),
        keyCode: event.keyCode,
      })

      store.commit.Context.Key.setIsModifier(event.isModifier)
      store.commit.Context.Key.setIsSelected(event.isSelected)
      store.commit.Context.Key.setX(event.pageX)
      store.commit.Context.Key.setY(event.pageY)
      store.commit.Context.Key.setKey(key)
      store.commit.Context.Key.show()
    }

    showDeviceContextMenuHandler(deviceInfo: NiaDeviceInfo, event: NiaDeviceShowContextMenuEvent): void {
      store.commit.Context.Device.setX(event.pageX)
      store.commit.Context.Device.setY(event.pageY)
      store.commit.Context.Device.setDevice(deviceInfo)
      store.commit.Context.Device.show()
    }

    tabContextMenuHandler(event: NiaTabContextMenuEvent) {
      const deviceInfo: NiaDeviceInfo | null = store.getters.Keymapping.DevicesInfo.getDeviceByIndex(event.index)

      if (deviceInfo !== null) {
        store.commit.Context.Device.setX(event.pageX)
        store.commit.Context.Device.setY(event.pageY)
        store.commit.Context.Device.setDevice(deviceInfo)
        store.commit.Context.Device.show()
      }
    }

    // methods
    getDeviceModifiers(deviceId: number): Array<NiaModifierDescription> {
      return this.modifiers
        .filter((selectedModifier) => {
          const modifierDeviceId: number | null = selectedModifier.getKey().getDeviceId()

          return modifierDeviceId === null || modifierDeviceId === deviceId
        })
    }

    getDeviceSelectedKeys(deviceId: number): Array<NiaKey> {
      return this.selectedKeys
        .filter((selectedKey) => selectedKey.getDeviceId() == deviceId)
    }

    // getters

    get modifiers(): Array<NiaModifierDescription> {
      return store.getters.Keymapping.Modifiers.definedModifiers
    }

    get devicesInfo(): Array<NiaDeviceInfo> {
      return store.getters.Keymapping.DevicesInfo.devices
    }

    get selectedKeys(): Array<NiaKey> {
      return store.getters.UI.Devices.selectedKeys
    }

    get selectedMappingKeyChords(): Array<NiaKeyChord> {
      return store.getters.UI.MappingTable.selectedMapping?.getKeyChords() ?? []
    }

    get selectedMappingKeys(): Array<NiaKey> {
      return this.selectedMappingKeyChords
        .map((keyChord: NiaKeyChord) => [...keyChord.getModifiers(), keyChord.getOrdinaryKey()])
        .flat()
    }

    getDeviceSelectedMappingKeys(deviceId: number): Array<NiaKey> {
      return this.selectedMappingKeys
      .filter((key: NiaKey) => key.getDeviceId() === null || key.getDeviceId() === deviceId)
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

    get deviceHeight(): number {
      return this.availableHeight
    }

    get deviceWidth(): number {
      return this.totalWidth
    }
  }
</script>

<style scoped>
  .nia-devices-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .nia-devices {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .nia-devices__nia-tabs {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .nia-devices__nia-tabs__nia-tab {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }


</style>
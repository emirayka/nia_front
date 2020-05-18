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

  import NiaKeyboard from '@/components/NiaKeyboard.vue'
  import {Prop} from 'vue-property-decorator'

  import {
    NiaDefineDeviceEvent,
    NiaDefineDeviceEventObject,
    NiaDeviceInfo,
    NiaKey, NiaModifierDescription,
    NiaRemoveDeviceEvent,
    NiaRemoveDeviceEventObject,
  } from '@/utils'

  @Component({
    name: 'NiaKeyboards',
    components: {
      NiaKeyboard,
    },
  })
  export default class NiaKeyboards extends Vue {
    @Prop({ required: true })
    devicesInfo!: Array<NiaDeviceInfo>

    @Prop({ required: true })
    selectedKeys!: Array<NiaKey>

    @Prop({ required: true })
    modifiers!: Array<NiaModifierDescription>

    $refs!: {
      tabs: HTMLDivElement;
    }

    switchHandler(deviceInfo: NiaDeviceInfo, needToDefine: boolean): void {
      if (needToDefine) {
        const args: NiaDefineDeviceEventObject = {
          deviceId: deviceInfo.getDeviceId(),
        }
        const defineKeyboardEvent: NiaDefineDeviceEvent = new NiaDefineDeviceEvent(
          args,
        )

        this.$emit('define-keyboard', defineKeyboardEvent)
      } else {
        const args: NiaRemoveDeviceEventObject = {
          devicePath: deviceInfo.getDevicePath(),
        }

        const removeKeyboardEvent: NiaRemoveDeviceEvent = new NiaRemoveDeviceEvent(
          args,
        )

        this.$emit('remove-keyboard', removeKeyboardEvent)
      }
    }

    clickKeyboardHandler(device: NiaDeviceInfo): void {
      this.$emit('click-keyboard', { keyboardPath: device.getDevicePath() })
    }

    clickKeyHandler(device: NiaDeviceInfo, keyCode: number): void {
      const key: NiaKey = new NiaKey({
        deviceId: device.getDeviceId(),
        keyCode: keyCode,
      })

      this.$emit('click-key', key)
    }

    getDeviceModifiers(deviceId: number): Array<NiaModifierDescription> {
      return this.modifiers
        .filter((selectedModifier) => selectedModifier.getKey().getDeviceId() == deviceId)
    }

    getDeviceSelectedKeys(deviceId: number): Array<NiaKey> {
      return this.selectedKeys
        .filter((selectedKey) => selectedKey.getDeviceId() == deviceId)
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
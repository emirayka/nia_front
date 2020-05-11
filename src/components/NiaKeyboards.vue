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
        :title="device.name"
      >
        <NiaKeyboard
          :model="device.model"
          :defined="device.defined"
          :keyboard-height="keyboardHeight"
          :keyboard-width="keyboardWidth"
          :key-selected="selectedKey !== null && device.path === selectedKey.keyboardPath"
          :selected-key-code="selectedKey !== null && selectedKey.keyCode"
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
  import {mapGetters} from 'vuex'

  import NiaKeyboard from '@/components/NiaKeyboard.vue'
  import {Prop} from 'vue-property-decorator'

  import {DeviceInfo, KeyboardKey} from '@/store/models'
  import store from '@/store'

  @Component({
    name: 'NiaKeyboards',
    components: {
      NiaKeyboard,
    },
  })
  export default class NiaKeyboards extends Vue {
    @Prop({required: true})
    devicesInfo!: Array<DeviceInfo>

    @Prop({required: true})
    selectedKey!: KeyboardKey

    $refs!: {
      tabs: HTMLDivElement;
    }

    switchHandler(deviceInfo: DeviceInfo, event: boolean): void {
      if (event) {
        this.$emit('define-keyboard', {
          keyboardPath: deviceInfo.path,
          keyboardName: deviceInfo.name,
        })
      } else {
        this.$emit('remove-keyboard', {
          keyboardPath: deviceInfo.path
        })
      }
    }

    clickKeyboardHandler(device: DeviceInfo): void {
      this.$emit('click-keyboard', {keyboardPath: device.path})
    }

    clickKeyHandler(device: DeviceInfo, keyCode: number): void {
      this.$emit('click-key', {keyboardPath: device.path, keyCode})
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
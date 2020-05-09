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
          :keyboard-height="keyboardHeight"
          :keyboard-width="keyboardWidth"
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
  import DeviceInfo from '@/store/models/device-info'

  @Component({
    name: 'NiaKeyboards',
    components: {
      NiaKeyboard,
    },
  })
  export default class NiaKeyboards extends Vue {
    @Prop({required: true})
    devicesInfo!: Array<DeviceInfo>

    $refs!: {
      tabs: HTMLDivElement;
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

    get availableHeight(): number {
      return this.totalHeight - this.tabTitlesHeight
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
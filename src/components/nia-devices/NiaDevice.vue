<template>
  <div
    class="top-wrapper"
    :style="topWrapperStyle"
  >
    <div
      class="nia-device-wrapper-wrapper"
      :style="deviceWrapperWrapperStyle"
    >
      <div
        class="nia-device-wrapper"
        :style="deviceWrapperStyle"
      >
        <div
          class="nia-device"
          :style="deviceStyle"
          @click="clickDeviceHandler($event)"
          @contextmenu.prevent.stop="contextMenuDeviceHandler($event)"
        >
          <NiaDeviceKey
            v-for="(key, index) in normalizedDeviceKeys"
            class="nia-device__nia-device-key"
            :x="key.x"
            :y="key.y"
            :width="key.width"
            :height="key.height"
            :code="key.code"
            :selected="isKeySelected(key.code)"
            :modifier="isKeyModifier(key.code)"
            :in-selected-mapping="isKeyInSelectedMapping(key.code)"
            :key="index"
            @select-key="selectHandler($event)"
            @toggle-key-selection="toggleSelectionHandler($event)"
            @show-key-context-menu="showContextMenuHandler($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import NiaDeviceKey from './NiaDeviceKey.vue'
  import {NiaDeviceModel, NiaKey, NiaModifierDescription} from '@/utils'
  import {
    NiaDeviceKeySelectEvent,
    NiaDeviceKeyToggleSelectionEvent,
  } from '@/components/nia-devices/NiaDeviceKey.vue'

  export interface NiaDeviceSelectEvent {
    keyCode: number;
    isModifier: boolean;
  }

  export interface NiaDeviceToggleSelectionEvent {
    keyCode: number;
    isModifier: boolean;
  }

  export interface NiaDeviceShowContextMenuEvent {
    keyCode: number;
    isModifier: boolean;
    isSelected: boolean;
    pageX: number;
    pageY: number;
  }

  const normalize = (value: number, min: number, max: number, multiplier: number): number => {
    const diff = max - min

    return (value - min) / diff * multiplier
  }

  @Component({
    name: "NiaDevice",
    components: {
      NiaDeviceKey,
    },
  })
  export default class NiaDevice extends Vue {
    @Prop({ required: true })
    model!: NiaDeviceModel

    @Prop({ required: true })
    deviceHeight!: number

    @Prop({ required: true })
    deviceWidth!: number

    @Prop({ required: true })
    defined!: boolean

    @Prop({ required: true })
    selectedKeys!: Array<NiaKey>

    @Prop({ required: true })
    modifiers!: Array<NiaModifierDescription>

    @Prop({ required: true })
    selectedMappingKeys!: Array<NiaKey>

    selectHandler(deviceKeySelectEvent: NiaDeviceKeySelectEvent) {
      this.$emit('select-key', deviceKeySelectEvent as NiaDeviceSelectEvent)
    }

    toggleSelectionHandler(deviceKeyToggleSelectionEvent: NiaDeviceKeyToggleSelectionEvent) {
      this.$emit('toggle-key-selection', deviceKeyToggleSelectionEvent as NiaDeviceToggleSelectionEvent)
    }

    showContextMenuHandler(deviceKeyShowContextMenuEvent: NiaDeviceShowContextMenuEvent) {
      this.$emit('show-key-context-menu', deviceKeyShowContextMenuEvent as NiaDeviceToggleSelectionEvent)
    }

    clickDeviceHandler(): void {
      this.$emit('clear-key-selection')
    }

    contextMenuDeviceHandler(event: MouseEvent): void {
      this.$emit('show-device-context-menu', event)
    }

    isKeySelected(keyCode: number): boolean {
      for (const selectedKey of this.selectedKeys) {
        if (selectedKey.getKeyCode() === keyCode) {
          return true
        }
      }

      return false
    }

    isKeyModifier(keyCode: number): boolean {
      for (const modifier of this.modifiers) {
        if (modifier.getKey().getKeyCode() === keyCode) {
          return true
        }
      }

      return false
    }

    isKeyInSelectedMapping(keyCode: number): boolean {
      for (const mappingKey of this.selectedMappingKeys) {
        if (mappingKey.getKeyCode() === keyCode) {
          return true
        }
      }

      return false
    }

    get deviceModelWidth(): number {
      return this.model.getDeviceWidth()
    }

    get deviceModelHeight(): number {
      return this.model.getDeviceHeight()
    }

    get deviceModelAspectRatio(): number {
      return this.deviceModelWidth / this.deviceModelHeight
    }

    get deviceAspectRatio(): number {
      return this.deviceWidth / this.deviceHeight
    }

    get deviceVisibleHeight(): number {
      if (this.deviceModelAspectRatio > this.deviceAspectRatio) {
        return this.deviceWidth / this.deviceModelAspectRatio
      } else {
        return this.deviceHeight
      }
    }

    get deviceVisibleWidth(): number {
      if (this.deviceModelAspectRatio > this.deviceAspectRatio) {
        return this.deviceWidth
      } else {
        return this.deviceHeight * this.deviceModelAspectRatio
      }
    }

    get deviceStyle(): object {
      return {
        width: `${this.deviceVisibleWidth - 60}px`,
        height: `${this.deviceVisibleHeight - 60}px`,
      }
    }

    get deviceWrapperStyle(): object {
      return {
        width: `${this.deviceVisibleWidth - 30}px`,
        height: `${this.deviceVisibleHeight - 30}px`,
      }
    }

    get deviceWrapperWrapperStyle(): object {
      return {
        width: `${this.deviceWidth}px`,
        height: `${this.deviceHeight}px`,
      }
    }

    get topWrapperStyle(): object {
      return {}
    }

    get normalizedDeviceKeys(): object {
      const normalizedDeviceKeys: Array<object> = this.model.getKeyDescriptions().map(key => {
        return {
          x: normalize(key.getX(), 0, this.deviceModelWidth, this.deviceVisibleWidth - 90) + 30,
          y: normalize(key.getY(), 0, this.deviceModelHeight, this.deviceVisibleHeight - 90) + 30,
          width: normalize(key.getWidth(), 0, this.deviceModelWidth, this.deviceVisibleWidth - 90),
          height: normalize(key.getHeight(), 0, this.deviceModelHeight, this.deviceVisibleHeight - 90),
          code: key.getKeyCode(),
        }
      })

      return normalizedDeviceKeys
    }
  }
</script>

<style
  scoped
  lang="scss"
>

  .nia-device {
    position: relative;
  }

  .nia-device-wrapper {
    margin: auto;
    background: linear-gradient(to left, #373737, #444, #444, #373737);

    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 7px solid #222;
    border-left: 5px solid #171717;
    border-radius: 15px;
  }

  .nia-device-wrapper-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
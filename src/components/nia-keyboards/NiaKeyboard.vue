<template>
  <div
    class="top-wrapper"
    :style="topWrapperStyle"
  >
    <div
      class="nia-keyboard-wrapper-wrapper"
      :style="keyboardWrapperWrapperStyle"
    >
      <div
        class="nia-keyboard-wrapper"
        :style="keyboardWrapperStyle"
      >
        <div
          class="nia-keyboard"
          :style="keyboardStyle"
          @click="clickKeyboardHandler($event)"
        >
          <NiaKeyboardKey
            v-for="(key, index) in normalizedKeyboardKeys"
            class="nia-keyboard__nia-keyboard-key"
            :x="key.x"
            :y="key.y"
            :width="key.width"
            :height="key.height"
            :code="key.code"
            :selected="isKeySelected(key.code)"
            :modifier="isKeyModifier(key.code)"
            :key="index"
            @click="clickKeyHandler($event)"
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

  import NiaKeyboardKey from './NiaKeyboardKey.vue'
  import {NiaDeviceModel, NiaKey, NiaModifierDescription} from '@/utils'

  const normalize = (value: number, min: number, max: number, multiplier: number): number => {
    const diff = max - min

    return (value - min) / diff * multiplier
  }

  @Component({
    name: "NiaKeyboard",
    components: {
      NiaKeyboardKey,
    },
  })
  export default class NiaKeyboard extends Vue {
    @Prop({ required: true })
    model!: NiaDeviceModel

    @Prop({ required: true })
    keyboardHeight!: number

    @Prop({ required: true })
    keyboardWidth!: number

    @Prop({ required: true })
    defined!: boolean

    @Prop({ required: true })
    selectedKeys!: Array<NiaKey>

    @Prop({ required: true })
    modifiers!: Array<NiaModifierDescription>

    clickKeyHandler(code: number): void {
      this.$emit('click-key', code)
    }

    clickKeyboardHandler(): void {
      this.$emit('click-keyboard')
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

    get keyboardModelWidth(): number {
      return this.model.getDeviceWidth()
    }

    get keyboardModelHeight(): number {
      return this.model.getDeviceHeight()
    }

    get keyboardModelAspectRatio(): number {
      return this.keyboardModelWidth / this.keyboardModelHeight
    }

    get keyboardAspectRatio(): number {
      return this.keyboardWidth / this.keyboardHeight
    }

    get keyboardVisibleHeight(): number {
      if (this.keyboardModelAspectRatio > this.keyboardAspectRatio) {
        return this.keyboardWidth / this.keyboardModelAspectRatio
      } else {
        return this.keyboardHeight
      }
    }

    get keyboardVisibleWidth(): number {
      if (this.keyboardModelAspectRatio > this.keyboardAspectRatio) {
        return this.keyboardWidth
      } else {
        return this.keyboardHeight * this.keyboardModelAspectRatio
      }
    }

    get keyboardStyle(): object {
      return {
        width: `${this.keyboardVisibleWidth - 60}px`,
        height: `${this.keyboardVisibleHeight - 60}px`,
      }
    }

    get keyboardWrapperStyle(): object {
      return {
        width: `${this.keyboardVisibleWidth - 30}px`,
        height: `${this.keyboardVisibleHeight - 30}px`,
      }
    }

    get keyboardWrapperWrapperStyle(): object {
      return {
        width: `${this.keyboardWidth}px`,
        height: `${this.keyboardHeight}px`,
      }
    }

    get topWrapperStyle(): object {
      return {}
    }

    get normalizedKeyboardKeys(): object {
      const normalizedKeyboardKeys: Array<object> = this.model.getKeyDescriptions().map(key => {
        return {
          x: normalize(key.getX(), 0, this.keyboardModelWidth, this.keyboardVisibleWidth - 90) + 30,
          y: normalize(key.getY(), 0, this.keyboardModelHeight, this.keyboardVisibleHeight - 90) + 30,
          width: normalize(key.getWidth(), 0, this.keyboardModelWidth, this.keyboardVisibleWidth - 90),
          height: normalize(key.getHeight(), 0, this.keyboardModelHeight, this.keyboardVisibleHeight - 90),
          code: key.getKeyCode(),
        }
      })

      return normalizedKeyboardKeys
    }
  }
</script>

<style
  scoped
  lang="scss"
>

  .nia-keyboard {
    position: relative;
  }

  .nia-keyboard-wrapper {
    margin: auto;
    background: linear-gradient(to left, #373737, #444, #444, #373737);

    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 7px solid #222;
    border-left: 5px solid #171717;
    border-radius: 15px;
  }

  .nia-keyboard-wrapper-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
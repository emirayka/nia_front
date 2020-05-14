<template>
  <div
    class="top-wrapper"
    :style="topWrapperStyle"
  >
    <NiaSwitchButton
      :isEnabled="defined"
      @toggle="$emit('switch', $event)"
    >
    </NiaSwitchButton>

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
            :class="selectedKeyClass(key.code)"
            :x="key.x"
            :y="key.y"
            :width="key.width"
            :height="key.height"
            :code="key.code"
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

  import {
    KeyboardModel,
    KeyDescription
  } from '@/store/models'
  import NiaKeyboardKey from './NiaKeyboardKey.vue'

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
    model!: KeyboardModel

    @Prop({ required: true })
    keyboardHeight!: number

    @Prop({ required: true })
    keyboardWidth!: number

    @Prop({ required: true })
    defined!: boolean

    @Prop({ default: false })
    keySelected!: boolean

    @Prop({ default: 0 })
    selectedKeyCode!: number | null

    selectedKeyClass(keyCode: number): object {
      return {
        'selected': this.keySelected && keyCode == this.selectedKeyCode,
      }
    }

    clickKeyHandler(code: number): void {
      this.$emit('click-key', code)
    }

    clickKeyboardHandler(): void {
      this.$emit('click-keyboard')
    }

    get keyboardModelWidth(): number {
      return this.model.width
    }

    get keyboardModelHeight(): number {
      return this.model.height
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
      const normalizedKeyboardKeys: Array<KeyDescription> = this.model.keys.map(keyboardKey => {
        return {
          x: normalize(keyboardKey.x, 0, this.keyboardModelWidth, this.keyboardVisibleWidth - 90) + 30,
          y: normalize(keyboardKey.y, 0, this.keyboardModelHeight, this.keyboardVisibleHeight - 90) + 30,
          width: normalize(keyboardKey.width, 0, this.keyboardModelWidth, this.keyboardVisibleWidth - 90),
          height: normalize(keyboardKey.height, 0, this.keyboardModelHeight, this.keyboardVisibleHeight - 90),
          code: keyboardKey.code,
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
  .nia-keyboard__nia-keyboard-key.selected:before {
    content: " ";
    position: absolute;
    z-index: 1;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px dotted gold;
    border-radius: 10%;
    background-color: #33FFDD03;
  }

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
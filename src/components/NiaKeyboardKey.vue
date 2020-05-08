<template>
  <div
    class="nia-keyboard-key"
    :style="style"
  >
    {{ mappedKeyCode }}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import {
    mapKeyCodeToString,
  } from '@/background-utils/utils'

  @Component({
    name: "NiaKeyboardKey",
  })
  export default class NiaKeyboardKey extends Vue {
    @Prop({required: true})
    x!: number

    @Prop({required: true})
    y!: number

    @Prop({required: true})
    height!: number

    @Prop({required: true})
    width!: number

    @Prop({required: true})
    code!: number

    get style(): object {
      return {
        position: 'absolute',
        border: '1px solid black',
        left: `${this.x}px`,
        top: `${this.y}px`,
        width: `${this.width}px`,
        height: `${this.height}px`,
        fontSize: this.fontSize,
        wordBreak: 'break-all',
      }
    }

    get mappedKeyCode(): string {
      const result: string | undefined = mapKeyCodeToString(this.code)

      if (result === undefined) {
        return 'Unknown'
      }

      return result
    }

    get fontSize(): string {
      const length = this.mappedKeyCode.length

      switch (length) {
        case 1:
        case 2:
          return '1em'
        default:
          return `${Math.max(0.25, 0.8 - length * 0.05)}em`
      }
    }
  }
</script>

<style
  scoped
  lang="scss"
>
  .nia-keyboard-key {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -o-user-select: none;
    text-align: center;
  }

  .nia-keyboard-key:hover {
    background-color: lightskyblue;
  }
</style>
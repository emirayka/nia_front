<template>
  <div
    class="nia-keyboard-key"
    :style="style"
    ref="keyElement"
  >
    {{ mappedKeyCode }}
  </div>
</template>

<script>
  import {
    mapKeyCodeToString,
  } from '@/background-utils/utils'

  export default {
    name: "NiaKeyboardKey",
    props: {
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      code: {
        type: Number,
        required: true,
      },
    },
    computed: {
      style: function () {
        const style = {
          position: 'absolute',
          border: '1px solid black',
          left: `${this.x}px`,
          top: `${this.y}px`,
          width: `${this.width}px`,
          height: `${this.height}px`,
          fontSize: this.fontSize,
          wordBreak: 'break-all',
        }

        return style
      },
      mappedKeyCode: function () {
        if (mapKeyCodeToString(this.code) === undefined) {
          console.log(this.code)
        }

        return mapKeyCodeToString(this.code)
      },
      fontSize: function () {
        const length = this.mappedKeyCode.length

        switch (length) {
          case 1:
          case 2:
            return '1em'
          default:
            return `${Math.max(0.25, 0.8 - length * 0.05)}em`
        }
      }
    },
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
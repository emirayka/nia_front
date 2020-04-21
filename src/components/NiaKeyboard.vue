<template>
  <div
    class="nia-keyboard"
  >
    <div class="nia-keyboard-wrapper-1">
      <div
        class="nia-keyboard-wrapper-2"
        :style="style"
      >
        <NiaKeyboardKey
          v-for="(key, index) in normalizedKeyboardKeys"
          class="nia-keyboard__nia-keyboard-keys"
          :x="key.x"
          :y="key.y"
          :width="key.width"
          :height="key.height"
          :code="key.code"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import NiaKeyboardKey from './NiaKeyboardKey.vue'

  const normalize = (value, min, max, multiplier) => {
    const diff = max - min

    return (value - min) / diff * multiplier
  }

  export default {
    name: "NiaKeyboard",
    components: {
      NiaKeyboardKey,
    },
    props: {
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      model: {
        type: Object,
        required: true,
      },
    },
    computed: {
      normalizedKeyboardKeys: function () {
        const keyboardWidth = this.model.width;
        const keyboardHeight = this.model.height;

        const normalizedKeyboardKeys = this.model.keys.map(keyboardKey => {
          return {
            x: normalize(keyboardKey.x, 0, keyboardWidth, this.width),
            y: normalize(keyboardKey.y, 0, keyboardHeight, this.height),
            width: normalize(keyboardKey.width, 0, keyboardWidth, this.width),
            height: normalize(keyboardKey.height, 0, keyboardHeight, this.height),
            code: keyboardKey.code,
          }
        })

        return normalizedKeyboardKeys
      },
      style: function () {
        return {
          width: `${this.width}px`,
          height: `${this.height}px`,
        }
      },
    },
  }
</script>

<style
  scoped
  lang="css"
>
  .nia-keyboard {
    margin: auto;
    padding: 25px;
  }

  .nia-keyboard-wrapper-1 {
    margin: auto;
    border: 1px solid black;
    background-color: #444444;
  }

  .nia-keyboard-wrapper-2 {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 20px;
  }
</style>
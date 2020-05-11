<template>
  <button
    class="nia-button"
    :style="style"
    @click.stop="$emit('click', $event)"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'
  import {Prop, Watch} from 'vue-property-decorator'

  import Color from 'color'

  @Component({
    name: 'NiaButton',
  })
  export default class NiaButton extends Vue {
    hover = false
    bgColor = 'black'
    fgColor = 'white'
    bgColorHover = 'black'
    fgColorHover = 'white'

    @Prop({ default: false })
    danger!: boolean

    @Prop({ default: false })
    success!: boolean

    get style(): object {
      const backgroundColor: string = this.hover
        ? this.bgColorHover
        : this.bgColor

      const color: string = this.hover
        ? this.fgColorHover
        : this.fgColor

      return {
        backgroundColor,
        color,
      }
    }

    updateColor(): void {
      if (this.danger) {
        this.bgColor = store.getters.ThemeModule.getBackgroundColorError2
        this.fgColor = store.getters.ThemeModule.getForegroundColorError2
      } else if (this.success) {
        this.bgColor = store.getters.ThemeModule.getBackgroundColorSuccess2
        this.fgColor = store.getters.ThemeModule.getForegroundColorSuccess2
      } else {
        this.bgColor = store.getters.ThemeModule.getBackgroundColor
        this.fgColor = store.getters.ThemeModule.getForegroundColor
      }

      const bgColor: Color = Color(this.bgColor)
      const fgColor: Color = Color(this.fgColor)

      this.bgColor = bgColor.lighten(0.5).hex()
      this.fgColor = fgColor.darken(0.5).hex()

      this.bgColorHover = bgColor.lighten(0.7).hex()
      this.fgColorHover = fgColor.hex()
    }

    mounted(): void {
      this.updateColor()
    }

    @Watch('success')
    onSuccessUpdate(): void {
      this.updateColor()
    }

    @Watch('danger')
    onDangerUpdate(): void {
      this.updateColor()
    }
  }
</script>

<style scoped>
  .nia-button {
    box-sizing: border-box;
    display: inline-block;

    margin: 0;
    padding: .375em .75em;

    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    line-height: 1.5;
    text-transform: none;

    border: 1px solid transparent;
    border-radius: .25rem;

    cursor: pointer;
    overflow: hidden;
    user-select: none;
    outline: none;

    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }
</style>
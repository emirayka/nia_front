<template>
  <div
    class="nia-device-key"
    :class="classes"
    :style="style"
    @click.prevent.stop="clickHandler($event)"
    @contextmenu.prevent.stop="contextMenuHandler($event)"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div
      class="nia-device-key-content"
      :class="classes"
    >
      {{ mappedKeyCode }}
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import {
    mapKeyCodeToString,
  } from '@/utils/utils'

  export interface NiaDeviceKeySelectEvent {
    keyCode: number;
    isModifier: boolean;
  }

  export interface NiaDeviceKeyToggleSelectionEvent {
    keyCode: number;
    isModifier: boolean;
  }

  export interface NiaDeviceKeyShowContextMenuEvent {
    keyCode: number;
    isModifier: boolean;
    isSelected: boolean;
    pageX: number;
    pageY: number;
  }

  @Component({
    name: 'NiaDeviceKey',
  })
  export default class NiaDeviceKey extends Vue {
    hover = false

    @Prop({ required: true })
    x!: number

    @Prop({ required: true })
    y!: number

    @Prop({ required: true })
    height!: number

    @Prop({ required: true })
    width!: number

    @Prop({ required: true })
    code!: number

    @Prop({ default: false })
    selected!: boolean

    @Prop({ default: false })
    modifier!: boolean

    @Prop({ default: false })
    inSelectedMapping!: boolean

    get style(): object {
      return {
        position: 'absolute',
        left: `${this.x - 2}px`,
        top: `${this.y - 2}px`,
        width: `${this.width + 5}px`,
        height: `${this.height + 5}px`,
        fontSize: this.fontSize,
      }
    }

    get classes(): object {
      return {
        'selected': this.selected,
        'modifier': this.modifier,
        'in-selected-mapping': this.inSelectedMapping,
        'hover': this.hover,
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
        case 3:
          return '1.1em'
        default:
          return `${Math.max(0.25, 0.9 - length * 0.05)}em`
      }
    }

    clickHandler(mouseEvent: MouseEvent): void {
      if (mouseEvent.shiftKey) {
        const event: NiaDeviceKeyToggleSelectionEvent = {
          isModifier: this.modifier,
          keyCode: this.code,
        }

        this.$emit('toggle-key-selection', event)
        return
      }

      const event: NiaDeviceKeySelectEvent = {
        isModifier: this.modifier,
        keyCode: this.code,
      }

      this.$emit('select-key', event)
    }

    contextMenuHandler(mouseEvent: MouseEvent): void {
      const event: NiaDeviceKeyShowContextMenuEvent = {
        keyCode: this.code,
        isModifier: this.modifier,
        isSelected: this.selected,
        pageX: mouseEvent.pageX,
        pageY: mouseEvent.pageY,
      }

      this.$emit('show-key-context-menu', event)
    }
  }
</script>

<style
  scoped
  lang="scss"
>

  .nia-device-key {
    box-sizing: content-box;

    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -o-user-select: none;
    word-break: break-all;

    /*background: linear-gradient(to left, #666, #555, #444, #333, #272727);*/
    background: rgb(80, 80, 80);
    background: -moz-linear-gradient(top, rgb(60, 60, 60), rgb(80, 80, 80));
    background: -webkit-gradient(linear, left top, left bottom, from(rgb(60, 60, 60)), to(rgb(80, 80, 80)));
    color: rgb(250, 250, 250);
    text-shadow: -1px -1px 0 rgb(70, 70, 70);
    -moz-box-shadow: inset 0 0 1px rgb(150, 150, 150), inset 0 -.05em .4em rgb(80, 80, 80), 0 .1em 0 rgb(30, 30, 30), 0 .1em .1em rgba(0, 0, 0, .3);
    -webkit-box-shadow: inset 0 0 1px rgb(150, 150, 150), inset 0 -.05em .4em rgb(80, 80, 80), 0 .1em 0 rgb(30, 30, 30), 0 .1em .1em rgba(0, 0, 0, .3);
    box-shadow: inset 0 0 1px rgb(150, 150, 150), inset 0 -.05em .4em rgb(80, 80, 80), 0 .1em 0 rgb(30, 30, 30), 0 .1em .1em rgba(0, 0, 0, .3);

    border-top: 1px solid #222;
    border-right: 1px solid #222;
    border-bottom: 5px solid #333;
    border-left: 4px solid #222;
    border-radius: 7px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.25s background;
  }

  .nia-device-key.modifier {
    background: mediumpurple;
  }

  .nia-device-key-content.in-selected-mapping:before {
    content: " ";
    position: absolute;
    z-index: 1;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 2px dotted lightskyblue;
    border-radius: 10%;
    background-color: #33FFDD03;
  }

  .nia-device-key.hover {
    background: #FFDD03;
    /*background: -moz-linear-gradient(top, gold, orange);*/
    /*background: -webkit-gradient(linear, orange, gold);*/

    border-top: 1px solid #222;
    border-right: 1px solid #222;
    border-bottom: 5px solid #333;
    border-left: 4px solid #222;

    color: black;
    font-weight: bold;
    text-shadow: -1px -1px 0 gold;
  }

  .nia-device-key.selected:before {
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
</style>
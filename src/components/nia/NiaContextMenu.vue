<template>
  <transition name="nia-context-menu">
    <div
      class="nia-context-menu-mask"
      v-if="shown"
      @click.prevent.stop="$emit('hide')"
    >
      <div
        class="nia-context-menu-container"
        :style="niaContextMenuContainerStyle"
      >

        <ul
          class="nia-context-menu"
          :style="niaContextMenuStyle"
          ref="contextMenu"
        >
          <NiaContextMenuItem
            v-for="(item, index) in items"
            :key="index"
            @click="$emit('click', item.name)"
          >
            {{ item.text }}
          </NiaContextMenuItem>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import {NiaContextMenuItemData} from '@/components/nia/lib'
  import NiaContextMenuItem from '@/components/nia/NiaContextMenuItem.vue'
  import store from '@/store'

  @Component({
    name: 'NiaContextMenu',
    components: {
      NiaContextMenuItem,
    },
  })
  export default class NiaContextMenu extends Vue {
    @Prop({ required: true })
    items!: Array<NiaContextMenuItemData>

    @Prop({ required: true })
    shown!: boolean

    @Prop({ required: true })
    x!: number

    @Prop({ required: true })
    y!: number

    $refs!: {
      contextMenu: HTMLElement;
    }

    get windowWidth(): number {
      return window.innerWidth
    }

    get windowHeight(): number {
      return window.innerHeight
    }

    get niaContextMenuStyle(): object {
      const contextMenuWidth: number = this.$refs.contextMenu?.offsetWidth ?? 0
      const contextMenuHeight: number = this.$refs.contextMenu?.offsetHeight ?? 0

      const left: string = contextMenuWidth + this.x >= this.windowWidth
        ? `${this.x - contextMenuWidth}px`
        : `${this.x}px`

      const top: string = contextMenuHeight + this.y >= this.windowHeight
        ? `${this.y - contextMenuHeight}px`
        : `${this.y}px`

      const display: string = this.shown
        ? 'block'
        : 'none'

      return {
        left,
        top,
        display,
      }
    }

    get niaContextMenuContainerStyle(): object {
      return {
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
      }
    }
  }
</script>

<style scoped>
  .nia-context-menu-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.05s ease;
  }

  .nia-context-menu-container {
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.1s ease;
  }

  .nia-context-menu {
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    z-index: 2147483647;
    border-bottom-width: 0px;
  }

  .nia-context-menu-enter {
    opacity: 0;
  }

  .nia-context-menu-leave-active {
    opacity: 0;
  }

  .nia-context-menu-enter .nia-context-menu-container,
  .nia-context-menu-leave-active .nia-context-menu-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
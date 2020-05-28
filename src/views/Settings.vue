<template>
  <div
    class="nia-settings"
    @click="clickHandler($event)"
  >
    <NiaContextMenu
      :x="x"
      :y="y"
      :visible="true"
      :items="items"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {NiaContextMenuItemData} from '@/components/nia/lib'

  @Component({
    name: 'Settings',
  })
  export default class Settings extends Vue {
    x = 100
    y = 100

    get items(): Array<NiaContextMenuItemData> {
      return [
        {
          name: 'arst',
          text: 'arst',
        },
        {
          name: 'arst2',
          text: 'arst2',
        },
      ]
    }

    clickHandler(event: MouseEvent): void {
      this.x = event.pageX
      this.y = event.pageY
    }
  }
</script>

<style
  scoped
  lang="scss"
>
  div.nia-settings {
    height: 1023px;
    width: 1919px;
  }
</style>

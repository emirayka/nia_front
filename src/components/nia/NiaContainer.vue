<template>
  <div
    class="nia-container"
    :style="style"
    @contextmenu.prevent.stop="$emit('contextmenu', $event)"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaContainer',
  })
  export default class NiaContainer extends Vue {
    @Prop({default: false})
    flex!: boolean

    @Prop({default: 2})
    colorLevel!: number

    @Prop({default: false})
    inline!: boolean

    get style(): object {
      const style = {
        display: 'block',
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
      }

      if (this.inline) {
        style.display = 'inline-block'
      }

      if (this.flex) {
        style.display = 'flex'
      }

      switch (this.colorLevel) {
        case 1:
          style.backgroundColor = store.getters.Theme.getBackgroundColor2
          style.color = store.getters.Theme.getForegroundColor2
          break;

        case 3:
          style.backgroundColor = store.getters.Theme.getBackgroundColor3
          style.color = store.getters.Theme.getForegroundColor3
          break;
      }

      return style
    }
  }
</script>

<style scoped>
  .nia-container {
    border-radius: 10px;
  }
</style>

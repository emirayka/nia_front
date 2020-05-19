<template>
  <div class="nia-tab" v-if="selected"
  :style="style">
    <slot>
    </slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'

  @Component({
    name: "NiaTab.ts",
  })
  export default class NiaTab extends Vue {
    @Prop({ default: '' })
    title!: string

    @Prop({ default: false })
    selected!: boolean

    get href(): string {
      return '#' + this.title.toLowerCase().replace(/ /g, '-');
    }

    get style(): object {
      return {
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getForegroundColor,
      }
    }
  }
</script>

<style scoped>
  .nia-tab {
  }
</style>

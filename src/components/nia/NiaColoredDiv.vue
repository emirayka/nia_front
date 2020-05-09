<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: "NiaColoredDiv",
  })
  export default class NiaColoredDiv extends Vue {
    @Prop({ default: '#000' })
    bg!: string

    @Prop({ default: '#fff' })
    fg!: string

    get style(): object {
      return {
        backgroundColor: this.bg ?? '#000',
        color: this.fg ?? '#fff',
        width: '100%',
        height: '100%',
      }
    }
  }
</script>

<style scoped>
</style>
